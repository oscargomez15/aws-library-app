const ENDPOINT= process.env.ENDPOINT;
const USERNAME=process.env.USER;
const PASSWORD=process.env.PASSWORD;
const DATABASE_NAME= process.env.DB;

const {SNSClient, PublishCommand} = require("@aws-sdk/client-sns");
const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  
  const snsClient = new SNSClient({});
  
  const snsMessage = ({
  Subject: 'Book has been deleted.',
  Message: 'Book was deleted',
  TopicArn: 'arn:aws:sns:us-east-1:533267210637:bookDeleted'
  });
  
  const id = event.queryStringParameters.id;
  let connection, response;

  try{
    connection = await mysql.createConnection({
        host: ENDPOINT,
        user: USERNAME,
        password: PASSWORD,
        database: DATABASE_NAME
    });
    
    try{
      const query = "DELETE FROM Books WHERE book_id = ?";
      await connection.execute(query, [id]);
      
      try{
      const command = new PublishCommand(snsMessage);
      await snsClient.send(command);
      }catch(err){
        response = {
          message: JSON.stringify('Could not send SNS message'),
          statusCode: 500
        }
      }
    
      response = {
        statusCode: 200,
        body: JSON.stringify(`Record has been deleted.`),
        headers:{
          'Access-Control-Allow-Origin':'*'
        }
        };
    }catch(err){
      response = {
        statusCode: 500,
        body: JSON.stringify('ERROR: Record could not found the book.'),
        error: err.message
      };
    }
    
    }catch(err){
      console.error(err);
    }finally{
      if(connection){
        try{
          await connection.end();
          console.log('Connection closed successfully.');
        }catch(err){
          console.error('Error closing connection', err.message);
        }
      }
    }

    return response;
  };

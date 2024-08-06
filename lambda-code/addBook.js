const ENDPOINT= process.env.ENDPOINT;
const USERNAME=process.env.USER;
const PASSWORD=process.env.PASSWORD;
const DATABASE_NAME= process.env.DB;

const mysql = require('mysql2/promise');
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

exports.handler = async (event) => {
  
  const snsClient = new SNSClient({});
  
  const eventBody = JSON.parse(event.body);
  const {author, title} = eventBody;
  
  const snsMessage = ({
  Message: `Book ${title} by ${author} has been added to the table.`,
  Subject: 'New Book added',
  TopicArn:'arn:aws:sns:us-east-1:533267210637:book_added'
})

  const command = new PublishCommand(snsMessage);

  let connection, response;
    
  try{
    connection = await mysql.createConnection({
      host: ENDPOINT,
      user: USERNAME,
      password: PASSWORD,
      database: DATABASE_NAME
    });
    
    const query = "INSERT INTO Books(`author`, `book_title`) VALUES (?,?)"
    const values = [
      author,
      title
      ];
  
    try{
      await connection.execute(query, values);
      await snsClient.send(command);
      
      response = {
        statusCode: 200,
        body: JSON.stringify(`Record added to table succesfully.`),
        headers: {
          'Access-Control-Allow-Origin':'*'
        } 
      }
    }catch(err){
      console.error(err.message);
    }
  }catch(err){
    response = {
      statusCode:500,
      body: JSON.stringify('Could not create the record, check the connection.'),
      error: err.message
    }
  }finally{
    await connection.end();
  }
  
  return response;
};

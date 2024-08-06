const ENDPOINT= process.env.ENDPOINT;
const USERNAME=process.env.USER;
const PASSWORD=process.env.PASSWORD;
const DATABASE_NAME= process.env.DB;

exports.handler = async (event) => {
  
  const mysql = require('mysql2/promise');
  const params = event.queryStringParameters.id;
  const eventBody = JSON.parse(event.body);
  const {author, title} = eventBody;
  let connection, response;
  
  try{
    connection = await mysql.createConnection({
        host: ENDPOINT,
        user: USERNAME,
        password: PASSWORD,
        database: DATABASE_NAME
    });
    
    const query = `UPDATE Books SET author = ?, book_title = ? WHERE book_id = ${params}`
    const values = [
      author,
      title
      ];
      
    await connection.execute(query, values);

    response = {
      statusCode: 200,
      body: JSON.stringify(`Book ${title} by ${author} has been updated. `),
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    };
    }catch(err){
      console.error(err);
      console.log(endpoint);
      
      response = {
        statusCode: 500,
        body: JSON.stringify('The record could not be updated.'),
        headers:{
        'Access-Control-Allow-Origin':'*'
        }
      }
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

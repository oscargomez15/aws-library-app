const ENDPOINT= process.env.ENDPOINT;
const USERNAME=process.env.USER;
const PASSWORD=process.env.PASSWORD;
const DATABASE_NAME= process.env.DB;

const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  
  let connection, response;
  
  try{
    connection = await mysql.createConnection({
        host: ENDPOINT,
        user: USERNAME,
        password: PASSWORD,
        database: DATABASE_NAME
    });
    
    if(event.queryStringParameters && event.queryStringParameters.id){
      const params = event.queryStringParameters.id;
      const query = 'SELECT * FROM Books WHERE book_id = ?';
      const values = [params];
      
      const [singleRecord, field] = await connection.execute(query, values);
      
      response = {
        statusCode:200,
        body: JSON.stringify(singleRecord),
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      }
      
    }else{
      const [singleRecord, field] = await connection.execute('SELECT * FROM Books');
      
      response = {
        statusCode:200,
        body: JSON.stringify(singleRecord),
        headers: {
          'Access-Control-Allow-Origin':'*'
        }        
      }    
    }    
    
    }catch(err){
      console.error(err);
    }finally{
      if(connection){
        try{
          await connection.end();
        }catch(err){
          console.error('Error closing connection', err.message);
        }
      }
    }
    
    console.log(response)

    return response;
  };

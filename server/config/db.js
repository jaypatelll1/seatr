const { Pool } = require('pg');
require('dotenv').config();

if(!process.env.PGDATABASE || !process.env.PGUSER || !process.env.PGPASSWORD || !process.env.PGPORT || !process.env.PGHOST){
  console.error("Please set the environment variables PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD");
  process.exit(1);
}

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: true, // Allow insecure certificates
    require: true
},
});

const query = async (text, params) => {
 
  let client 
  try {
    // console.log('pool',pool);
     client = await  pool.connect() ;
    console.log("Database connection established");
    const res = client.query(text,params)
    return res;
  } catch (error) {
    console.error("Error running query!", error.stack);
    throw error;
  } finally{
    if(client){
      client.release();
    }
  }
};

module.exports = { query };
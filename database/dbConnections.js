import mysql from 'mysql';

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "restapi_node",
});

// exports.db = db;

export default db;
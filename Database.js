const sql = require("mssql");

const config = {
  user: "sa",                
  password: "Sermonbadi30*",    
  server: "localhost",       
  database: "AdventureWorks2022",         
  options: {
    encrypt: false,          
    trustServerCertificate: true
  }
};

module.exports = config;


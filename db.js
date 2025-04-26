const sql = require("mssql");
require("dotenv").config();

const config = {
  server: "group4gimpsql.database.windows.net",
  database: "Group4GimpDB",
  user: "group4admin",
  password: "KSU2025group4",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = {
  connect: () => sql.connect(config),
  sql,
};

// const mysqlPool = mysql.createPool({ //connects to the database
//     host: 'group4gimpsql.database.windows.net',
//     user: process.env.user,
//     password: process.env.password, // username and password for the database are stored in the .env file
//     database: process.env.db_name

// });

// mysqlPool
//   .query("SELECT 1")
//   .then(() => console.log("Successful Database Connection"))
//   .catch((err) => console.log("Database Connection Failed. \n" + err));

// module.exports = mysqlPool;

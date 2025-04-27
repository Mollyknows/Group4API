const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
// var session = require("express-session");
// const db = require("../db");
// const sql = require("mssql");
const { connectDB, sql } = require("../db");

// module.exports.registerUser = async (req, res) => {
//   const { email, username, password } = req.body;

//   // Validation
//   if (!username || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       error: "Please provide all required fields",
//     });
//   }

//   // Check if the user already exists
//   const [existingUser] = await connect.query(
//     "SELECT * FROM User WHERE email = ? OR username = ?",
//     [email, username]
//   );

//   if (existingUser.length > 0) {
//     return res.status(409).json({ error: "User already exists." });
//   }

//   // Hash the password
//   const hashPass = await bcrypt.hash(password, 10);

//   // Insert new user
//   await db.query(
//     "INSERT INTO User (email, username, password) VALUES (?, ?, ?)",
//     [email, username, hashPass]
//   );

//   res.status(201).json({ message: "User registered successfully." });
// };

module.exports.loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  let pool;
  // Check if the user exists
  pool = await connectDB();
  let user = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query("select * from [dbo].[User] where email = @email");

  console.log(user);

  if (user.recordset[0] === undefined) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.recordset[0].password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  // Set session or token here

  res.status(200).json({ message: "Login successful." });
};

// module.exports.logoutUser = async (req, res) => {
//   // Clear the session or token here
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to log out." });
//     }
//     res.status(200).json({ message: "Logout successful." });
//   });
// };

// module.exports.deleteUser = async (req, res) => {
//   const { userId } = req.body;

//   // Check if the user exists
//   const [user] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

//   if (user.length === 0) {
//     return res.status(404).json({ error: "User not found." });
//   }

//   // Delete the user
//   await db.query("DELETE FROM users WHERE id = ?", [userId]);

//   res.status(200).json({ message: "User deleted successfully." });
// };

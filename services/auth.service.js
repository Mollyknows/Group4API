const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const session = require("express-session");
// const db = require("../db");
// const sql = require("mssql");
const { connectDB, sql } = require("../db");

const saltRounds = 10;

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  //Validation
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required details." });
  }

  //create pool
  const pool = await connectDB();

  // Check if the user already exists
  let validationResult = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .input("username", sql.NVarChar(100), email)
    .query(
      "select * from [dbo].[User] where email = @email OR username = @username"
    );
  for (i in validationResult) {
    if (
      validationResult[i].email === email ||
      validationResult[i].username === username
    ) {
      return res.status(400).json({
        error:
          "A user with that username or email already exists in our system.",
      });
    }

    console.log("password before:", password);
    // Validate password
    if (
      password.search(" ") != -1 ||
      password.length < 4 ||
      password.length > 20
    ) {
      return res.status(400).json({
        error:
          "Please provide a valid password. Valid passwords are greater than 3 characters, less than 20 characters, and contain no spaces.",
      });
    }
    let passHash = "";
    bcrypt.hash(password, saltRounds, (err, hash) => {
      sendNewUser(email, username, hash, pool);
      if (typeof err === Error) {
        return res.status(400).json({
          error: "Something went wrong while securing passsword.",
        });
      }
    });
    return res.status(200).json({
      message: "New account logged.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email and password." });
  }

  try {
    // Check if the user exists
    const pool = await connectDB();
    let result = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .query("select * from [dbo].[User] where email = @email");

    user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Set session or token here
    req.session.user = {
      id: user.userID,
      email: user.email,
      username: user.username,
    };

    res.status(200).json({
      message: "Login successful.",
      user: { id: user.userID, email: user.email, username: user.username },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ e: "Failed to Login." });
  }
});

router.logout("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy((e) => {
      if (err) {
      }
    });
  }
});
// module.exports.logoutUser = async (req, res) => {
//   // Clear the session or token here
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to log out." });
//     }
//     res.status(200).json({ message: "Logout successful." });
//   });
// };

module.exports = router;

async function sendNewUser(email, username, passHash, pool) {
  console.log(passHash);
  try {
    await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("username", sql.NVarChar(100), username)
      .input("passHash", sql.NVarChar(255), passHash)
      .query(
        "INSERT INTO [dbo].[User] (email, username, password) VALUES (@email,@username,@passHash)"
      );
  } catch (e) {
    console.log(e);
  }
}

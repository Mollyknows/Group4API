const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const authService = require("./services/auth.service.js");
const extensionController = require("./controllers/extension.controllers.js");
const session = require("express-session");
const { connectDB } = require("./db.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //folder for static files

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Use the extensionController for routes
app.use("/", extensionController);

connectDB().catch((error) => {
  console.log("Database connection failed!");
});

// Front-end routes
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/auth/session", (req, res) => {
  if (req.session.user) {
    console.log("User is logged in:", req.session.user);
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Extensions gallery page
app.get("/gallery", (req, res) => {
  res.render("gallery.html");
});

// Extension detail page
app.get("/extension/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "extension-detail.html"));
});

// Upload extension page (requires authentication)
app.get("/upload", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login?redirect=/upload");
  }
  res.sendFile(path.join(__dirname, "public", "upload.html"));
});

// Manage extensions page (requires authentication)
app.get("/manage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login?redirect=/manage");
  }

  res.sendFile(path.join(__dirname, "public", "manage.html"));
});

// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Documentation page
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "documentation.html"));
});

// Search page
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

// User profile page
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login?redirect=/profile");
  }
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

//error handeling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send("Something went wrong!");
});

// route to auth services
app.use("/auth", authService);

//Starts application on localhost port 3000
app.listen(3000, () => console.log("Server Started on port 3000"));

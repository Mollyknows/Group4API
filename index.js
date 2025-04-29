const express = require("express");
const app = express();
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");
const authService = require("./services/auth.service.js");
const extensionService = require("./services/extension.service.js");
const session = require("express-session");
const { connectDB } = require("./db.js");
const upload = multer({ dest: 'temp/' });

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

connectDB().catch((error) => {
  console.log("Database connection failed!");
});

// //middleware
// app.use(bodyParser.json());
// app.use("/api", apiRoutes);
// app.use(express.json());

// Front-end routes
// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Extensions gallery page
app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

// Extension detail page
app.get("/extension/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "extension-detail.html"));
});

// Upload extension page (requires authentication)
// Serve the HTML upload page
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), extensionService.uploadFile);

// Manage extensions page
app.get("/manage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login?redirect=/manage");
  }

  res.sendFile(path.join(__dirname, "public", "manage.html"));
});

const extensionsPath = path.join(__dirname, 'extensions');
if (!fs.existsSync(extensionsPath)) {
    fs.mkdirSync(extensionsPath);
}

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

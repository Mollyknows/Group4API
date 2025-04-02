const express = require ('express');
    app = express();
    bodyParser = require('body-parser');

require('express-async-errors');

const db = require ('./db'),
    extensionRoutes = require('./controllers/extension.controller');

//middleware
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(express.json());
app.use(express.static('public')); //folder for static files


// Front-end routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Extensions gallery page
app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

// Extension detail page
app.get('/extension/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'extension-detail.html'));
});

// Upload extension page (requires authentication)
app.get('/upload', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?redirect=/upload');
    }
res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// Manage extensions page (requires authentication)
app.get('/manage', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?redirect=/manage');
    }
    
    res.sendFile(path.join(__dirname, 'public', 'manage.html'));
});

// Admin dashboard (requires admin authentication)
app.get('/admin', (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/login?redirect=/admin');
    }
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Documentation page
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// Search page
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// User profile page
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login?redirect=/profile');
    }
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});



//error handeling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong!');
});


//Starts application on localhost port 3000
app.listen(3000,
    () => console.log('Server Started on port 3000'));
// Dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/apiRoutes');

// Setting PORT + Express.js
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// Listening on PORT
app.listen(PORT, () => 
    console.log(`listening on port ${PORT}`)
);
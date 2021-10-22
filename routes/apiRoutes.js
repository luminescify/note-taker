const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


// GET route for retrieving all the notes
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for existing notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route for submitting a new note
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit new note`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error creating a new note');
    }
})

module.exports = router;
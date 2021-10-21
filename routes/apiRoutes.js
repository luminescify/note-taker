const path = require('path');
const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const noteData = require('../db/db.json');

router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for existing notes`);
    readFromFile(noteData).then((data) => res.json(JSON.parse(data)));
})

router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to submit new note`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, '../');

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
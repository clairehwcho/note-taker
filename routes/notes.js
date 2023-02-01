const notesRouter = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notesRouter.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    }
    else {
        res.json('Error in posting note')
    }
});

// DELETE Route for deleting an existing note
notesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (id) {
        readAndDelete('./db/db.json', id);

        const response = {
            status: 'success',
            body: req.params
        };

        res.json(response);
    }
    else {
        res.json('Error in deleting note')
    }
});

module.exports = notesRouter;
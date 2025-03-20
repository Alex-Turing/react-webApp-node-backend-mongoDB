const notesRouter = require('express').Router();
const Note = require('../models/note');


notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    })
});

notesRouter.get('/:id', (request, response) => {
    const id = request.params.id;
    Note.findById(id)
        .then(note => {
            if (note) {
                response.json(note)
            }
            else {
                response.status(404).json({
                    error: `Note with ID ${id} not found`,
                    status: 404,
                    timeStamp: new Date().toISOString()
                });
            }
        });
});

notesRouter.post('/', (request, response) => {
    const body = request.body;
    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save()
        .then(savedNote => {
            response.json(savedNote);
        })
        .catch(error => next(error));
});

notesRouter.delete('/:id', (request, response) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                response.status(204).end();
            }
            else {
                response.status(404).json({
                    error: `Note with ID ${id} not found`,
                    status: 404,
                    timeStamp: new Date().toISOString()
                });
            }
        })
        .catch(error => next(error));
});

notesRouter.put('/:id', (request, response) => {
    const id = request.params.id;
    const { content, important } = request.body;

    if (!content || typeof content !== 'string') {
        return response.status(400).json({
            error: 'Invalid or missing content.',
            status: 400,
            timeStamp: new Date().toISOString()
        });
    }
    if (typeof important !== 'boolean') {
        return response.status(400).json({
            error: 'Invalid or missing important value.',
            status: 400,
            timeStamp: new Date().toISOString()
        });
    }
    Note.findByIdAndUpdate(id, { content, important }, { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            if (!updatedNote) {
                return response.status(404).json({
                    error: `Note with ID ${id} not found`,
                    status: 404,
                    timeStamp: new Date().toISOString()
                });
            }
            response.json(updatedNote);
        })
        .catch(error => next(error));
});

module.exports = notesRouter;
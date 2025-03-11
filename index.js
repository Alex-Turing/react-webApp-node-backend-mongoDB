
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');
const app = express();

/**
 * express.json() realiza el json-parser de la informacion
 * para ser enviada en el metodo POST de HTTP.
 * El json-parser funciona para que tome los datos JSON de 
 * una solicitud, los transforme en un objeto JavaScript y 
 * luego los adjunte a la propiedad body del objeto request 
 * antes de llamar al controlador de ruta.
 */
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());


/**
 * Using express library instead of http
 * significantly reduces the complexity of
 * implementing the backend server
 */
//const http = require('http');

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// const app = http.createServer((req, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(notes));
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
    //response.json(notes); //This line returns the data in the notes array, when data is located  inside this file for testing purposes
    Note.find({}).then(notes => {
        response.json(notes);
    })
});

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    //const note = notes.find(note => note.id === id);
    const note = Note.findById(id);

    if (note) {
        response.json(note);
    }
    else {
        response.status(404).json({
            error: `Note with ID ${id} not found.`,
            status: 404,
            timeStamp: new Date().toISOString()
        });
    }
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);

    response.status(204).json({
        message: `Note with id ${id} was successfully deleted`,
        status: 204,
        timeStamp: new Date().toISOString()
    });
});

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0;
    console.log('Max ID: ', maxId);
    return maxId + 1;
};

app.post('/api/notes', (request, response) => {
    const body = request.body;
    if (body.content === undefined) {
        return response.status(400).json({
            error: 'Content is missing.',
            status: 400,
            timeStamp: new Date().toISOString()
        });
    }

    const note = new Note ({
        content: body.content,
        important: Boolean(body.important) || false,
        //id: generateId(),
    })

    //notes = notes.concat(note);   //This line returns the data in the notes array, when data is located  inside this file for testing purposes

    note.save().then(savedNote => {
        response.json(savedNote);
    });

    console.log('Note:', note);
    response.json(note);
});

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const body = request.body;

    const note = notes.find(n => n.id === id);

    if (!note) {
        return response.status(404).json({
            error: `Note with ID ${id} not found.`,
            status: 404,
            timeStamp: new Date().toISOString()
        });
    }

    if (!body.content || typeof body.content !== 'string') {
        return response.status(400).json({
            error: 'Invalid or missing content.',
            status: 400,
            timeStamp: new Date().toISOString()
        });
    }

    if (typeof body.important !== 'boolean') {
        return response.status(400).json({
            error: 'Invalid or missing important value.',
            status: 400,
            timeStamp: new Date().toISOString()
        });
    }

    const updatedNote = { ...note, content: body.content, important: body.important };

    notes = notes.map(n => (n.id === id ? updatedNote : n));

    response.json(updatedNote);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
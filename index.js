
// const config = require('./utils/config');
// const logger = require('./utils/logger');
// const express = require('express');
// const cors = require('cors');
// const Note = require('./models/note');
// const app = express();

const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

// /**
//  * express.json() realiza el json-parser de la informacion
//  * para ser enviada en el metodo POST de HTTP.
//  * El json-parser funciona para que tome los datos JSON de 
//  * una solicitud, los transforme en un objeto JavaScript y 
//  * luego los adjunte a la propiedad body del objeto request 
//  * antes de llamar al controlador de ruta.
//  */
// app.use(express.json());
// app.use(express.static('dist'));
// app.use(cors());

// /**
//  * Using express library instead of http
//  * significantly reduces the complexity of
//  * implementing the backend server
//  */
// //const http = require('http');

// // const app = http.createServer((req, response) => {
// //     response.writeHead(200, { 'Content-Type': 'application/json' });
// //     response.end(JSON.stringify(notes));
// // })

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (request, response) => {
//     //response.json(notes); //This line returns the data in the notes array, when data is located  inside this file for testing purposes
//     Note.find({}).then(notes => {
//         response.json(notes);
//     })
// });

// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id;
//     Note.findById(id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             }
//             else {
//                 response.status(404).json({
//                     error: `Note with ID ${id} not found`,
//                     status: 404,
//                     timeStamp: new Date().toISOString()
//                 });
//             }
//         })
//         .catch(error => next(error));
// });

// app.delete('/api/notes/:id', (request, response, next) => {
//     const id = request.params.id;

//     Note.findByIdAndDelete(id)
//         .then(note => {
//             if (note) {
//                 response.status(204).end();
//             }
//             else {
//                 response.status(404).json({
//                     error: `Note with ID ${id} not found`,
//                     status: 404,
//                     timeStamp: new Date().toISOString()
//                 });
//             }
//         })
//         .catch(error => next(error));
// });

// app.post('/api/notes', (request, response, next) => {
//     const body = request.body;
//     const note = new Note({
//         content: body.content,
//         important: Boolean(body.important) || false,
//     })

//     note.save()
//         .then(savedNote => {
//             response.json(savedNote);
//         })
//         .catch(error => next(error));
//     console.log('Note:', note);
// });

// app.put('/api/notes/:id', (request, response, next) => {
//     const id = request.params.id;
//     const { content, important } = request.body;

//     if (!content || typeof content !== 'string') {
//         return response.status(400).json({
//             error: 'Invalid or missing content.',
//             status: 400,
//             timeStamp: new Date().toISOString()
//         });
//     }
//     if (typeof important !== 'boolean') {
//         return response.status(400).json({
//             error: 'Invalid or missing important value.',
//             status: 400,
//             timeStamp: new Date().toISOString()
//         });
//     }
//     Note.findByIdAndUpdate(
//         id, { content, important },
//         { new: true, runValidators: true, context: 'query' }
//     )
//         .then(updatedNote => {
//             if (!updatedNote) {
//                 return response.status(404).json({
//                     error: `Note with ID ${id} not found.`,
//                     status: 404,
//                     timeStamp: new Date().toISOString()
//                 });
//             }
//             response.json(updatedNote);
//         })
//         .catch(error => next(error));
// });

// const errorHandler = (error, request, response, next) => {
//     console.error(error.message);
//     if (error.message === 'CastError') {
//         return response.status(400).send({ error: 'malformated id' });
//     }
//     else if (error.name === 'ValidationError') {
//         return response.status(400).json({ error: error.message })
//     }

//     next(error);
// }

// app.use(errorHandler);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
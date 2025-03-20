const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controller/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;

logger.info('connecting to', url);

mongoose.connect(url)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('Error connecting to MongoDB:', error.message)
    });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
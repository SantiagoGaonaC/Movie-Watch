const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../src/views')));

app.use(require('./routes/auth'));
app.use(require('./routes/movie'));
app.use(require('./routes/home'));

module.exports = app;
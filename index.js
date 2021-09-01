require('dotenv').config();

const express = require('express');
const session = require('express-session')
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

const  morgan = require('morgan');

app.use( morgan('tiny'))
// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

// Rutas
app.use( '/api/login', require('./src/auth/authRoutes') );
app.use( '/api/usuarios', require('./src/usuario/usuariosRoutes') );
app.use( '/api/tareas', require('./src/tarea/tareaRoutes') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + `http://localhost:${process.env.PORT}`);
});

module.exports = app
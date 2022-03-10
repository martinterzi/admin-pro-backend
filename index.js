
const express = require('express');
require('dotenv').config();
const cors = require ('cors')


const {dbConnection} = require('./database/config');

const app = express();

app.use(cors());

// lectura de body
app.use(express.json());

//bd
dbConnection();

//DIRECTORIO PUBLICO
app.use(express.static('public'));

// mean_user
// 7iNgDf4XiXs5zyAl

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendo')
})
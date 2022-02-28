
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

console.log(process.env)

// mean_user
// 7iNgDf4XiXs5zyAl

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendo')
})
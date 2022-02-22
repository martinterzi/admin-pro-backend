
const express = require('express');
require('dotenv').config();
const cors = require ('cors')


const {dbConnection} = require('./database/config');

const app = express();

app.use(cors());

//bd
dbConnection();

console.log(process.env)

// mean_user
// 7iNgDf4XiXs5zyAl

//rutas
app.get( '/', (req, res)=>{

    res.json({
        ok:true,
        msg:'hola mundo'
    })

} );


app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendo')
})
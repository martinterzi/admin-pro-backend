const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async()=>{

    try{

        //mongodb+srv://mean_user:7iNgDf4XiXs5zyAl@cluster0.ywq8o.mongodb.net/hospitaldb
        await mongoose.connect(process.env.DB_CON);

        console.log('db OKK')

    } catch(error){
        console.log(error);
        throw new Error ('error conexion db');

    }

   
}

module.exports={
    dbConnection
}
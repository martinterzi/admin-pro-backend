const {response} =require('express');
const bcrypts = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require ('../models/usuario');
const res = require('express/lib/response');




const getUsuarios = async (req, res)=>{

    const usuario = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuario
    })

};

const crearUsuarios = async(req, res = response)=>{
    const { email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
   

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: ' El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypts.genSaltSync();
        usuario.password = bcrypts.hashSync(password, salt)

        await usuario.save();
        // generar token
       const token = await generarJWT(usuario.id);
       

        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error inesperado'
        })
        
    }




   

};


const actualizarUsuarios = async ( req, res = response) =>{

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById (uid);

        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: ' No existe usuario con ese id'
            })
        }

        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email){

          const existeEmail = await Usuario.findOne({email});
          if(existeEmail) {
              return res.status(400).json({
                  ok: false,
                  msg:'Ya existr un usuario con ese email'
              });
          }

        }

        campos.email= email;

         // actualizar
        
        delete campos.password;
        delete campos.google;

        const userActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true})

        res.json({
            ok: true,
            usuario: userActualizado
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }



}

const borrarUsuarios = async ( req, res = response) =>{

    const uid = req.params.id;
    

    try {

        
        const usuarioDB = await Usuario.findById (uid);

        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: ' No existe usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            uid
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Hable con el admin'
        })
        
    }

    


}





module.exports= {getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios};
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypts = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDb = await Usuario.findOne({ email });

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'email incorrecto'
            });
        }

        const validarPass = bcrypts.compareSync(password, usuarioDb.password);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: ' Pass incorrecto'
            });
        }


       // generar token
       const token = await generarJWT(usuarioDb.id);

        return res.json({
            ok: true,
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })

    }

}



const googleSignIn = async(req, res= response)=>{

    const googleToken = req.body.token;

    

    try {

        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDb =await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDb){
            //sino existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google: true
            });

        }  else {
            usuario= usuarioDb;
            usuario.google=true;

        }

        // guardar en db
        await usuario.save();

        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok: true,
            msg: ' Google SignIn',
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: ' Token no es correcto'
            
        });
        
    }

   



}



module.exports = { login, googleSignIn }
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypts = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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



module.exports = { login }
const path = require('path');
const fs = require('fs');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');


const fileUploads = (req, res= response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos=['hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false, 
            msg:'Tipo no valido'
        });
    }
    // validad que exite un archivo
    if(!req.files || Object.keys(req.files).length ===0){
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningum archivo'
        })
    }

    //procesamos la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extenciones
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok: false,
            msg:'Extencion no permitida'
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4()}.${extencionArchivo}`;

    //Path para guardar la imagen
    const path =`./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err)=>{
        if(err){

            console.log(err)
            return res.status(500).json({
                ok:false,
                msg: 'err al mover la carga'
            })
        }

        //actualizar bd
        actualizarImagen(tipo, id, nombreArchivo);
        
        res.json({
            ok: true,
            msg: 'fileUpload',
            nombreArchivo
        });

        
    });


       


};


const retornaImagen =(req, res = response )=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // img por defecto
    // si la el archivo existe, else img predeterminada
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }  else {
        const pathImg = path.join(__dirname, `../uploads/noImage.png`);
        res.sendFile(pathImg);
    }

   
}


module.exports= {
    fileUploads,
    retornaImagen
}
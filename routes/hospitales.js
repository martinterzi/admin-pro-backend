/*
  Hospitales
  /api/hospitales
*/

const {getHospitales, crearHospitales, actualizarHospitales, borrarHospitales} =require('../controllers/hospitales');
const {validarCampos} = require('../middlewares/validar-campos');


const {Router} = require('express');
const {check} = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get( '/', getHospitales);

router.post( '/',[
  validarJWT,
  check('nombre', 'El nombre del Hospital es necesario').not().isEmpty(),
  validarCampos

],
 crearHospitales);

router.put('/:id',
[
  validarJWT,
  check('nombre', ' el nombre de hodpital es necesario').not().isEmpty(),
  validarCampos
],
actualizarHospitales);


router.delete('/:id',
validarJWT,
borrarHospitales);


module.exports= router;
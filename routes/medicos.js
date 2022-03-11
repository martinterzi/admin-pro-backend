/*
  Medicos
  /api/medicos
*/

const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');


const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/', getMedicos);

router.post('/'
  , [
    validarJWT,
    check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos],
crearMedicos);



router.put('/:id',
[
  validarJWT,
  check('nombre', ' el nombre de Medico es necesario').not().isEmpty(),
  check('hospital', 'El hospital id debe ser valido').isMongoId(),
  validarCampos
]
,actualizarMedicos);


router.delete('/:id', borrarMedicos);


module.exports = router;
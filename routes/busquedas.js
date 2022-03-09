/*



ruta: api/todo/:busqueda

*/

const { Router } = require('express');
const {getTodo, getDocumentosColeccion} =  require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/:busqueda', validarJWT,getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT,getDocumentosColeccion);





router.put('/:id', );


router.delete('/:id', );


module.exports = router;
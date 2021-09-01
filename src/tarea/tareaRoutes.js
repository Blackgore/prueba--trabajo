/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTareas, crearTarea, actualizarTarea, borrarTarea } = require('./tareaController');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getTareas );

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    validarJWT,
    crearTarea 
);

router.put( '/',
    [
        validarJWT,
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarTarea,
);

router.delete( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    ],
    borrarTarea
);

module.exports = router;
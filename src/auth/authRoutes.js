/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, renewToken } = require('./authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.post( '/',
    [
        check('username', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.get( '/renew',
    validarJWT,
    renewToken
)

module.exports = router;

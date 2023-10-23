const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo.middleware');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/login',
  [check('email', 'El correo es obligatorio').isEmail(), validarCampos],
  [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;

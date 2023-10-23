const validarCampos = require('./validar-campo.middleware');
const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-roles');

module.exports = {
  ...validarCampos,
  ...validateJWT,
  ...validateRoles,
};

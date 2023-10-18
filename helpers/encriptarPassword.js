const bcrypt = require('bcrypt');

// Encriptar contraseña
const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports = {
  encryptPassword,
};

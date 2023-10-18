const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no está registrado en la BDD`);
  }
};

const emailExist = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El id ${id} no existe`);
  }
};

const isFrom = async (from = 0) => {
  if (!Number.isInteger(+from)) {
    throw new Error(`El from debe ser un número entero`);
  }
};

const isLimit = async (limit = 0) => {
  if (!Number.isInteger(+limit)) {
    throw new Error(`El limit debe ser un número entero`);
  }
};

module.exports = {
  isValidRole,
  emailExist,
  userExistById,
  isFrom,
  isLimit,
};

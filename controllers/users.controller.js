const { response } = require('express');
const User = require('../models/user');
const { encryptPassword } = require('../helpers/encriptarPassword');

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(+from).limit(+limit),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar contraseña
  user.password = encryptPassword(password);

  // Guardar en DB
  await user.save();

  res.json({
    msg: 'post API - controller',
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;
  // TODO validar contra BDD
  if (password) {
    resto.password = encryptPassword(password);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  // No lo elimino fisicamente, solo cambio su status a false
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    userDeleted: user,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'Patch API - controller',
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};

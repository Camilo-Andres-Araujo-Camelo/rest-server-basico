const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { genJWT } = require('../helpers/gen-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'El Usuario / Password no son correctos - correo',
      });
    }

    // Verificar si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: 'El Usuario / Password no son correctos - status: false',
      });
    }
    // Verficar password
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'El Usuario / Password no son correctos - password no coincide',
      });
    }

    //Generar el JWT
    const token = await genJWT(user.id);

    res.json({
      msg: 'Login ok',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contacte al administrador',
    });
  }
};

module.exports = {
  login,
};

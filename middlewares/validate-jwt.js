const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('auth-token');
  // console.log(token);
  if (!token) {
    return res.status(400).json({ msg: 'No token provided' });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer usuario que corresponde al uid
    const user = await User.findById(uid);

    //Verificar si user existe
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid Token - User no existe en DB',
      });
    }

    // Verificar status del uid del user
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token no válido - user.status: false',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};

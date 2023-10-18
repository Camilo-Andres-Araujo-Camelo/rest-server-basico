const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo.middleware');
const {
  isValidRole,
  emailExist,
  userExistById,
  isFrom,
  isLimit,
} = require('../helpers/db-validators');

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require('../controllers/users.controller');

const router = Router();

router.get(
  '/',
  [check('from').custom(isFrom), check('limit').custom(isLimit), validarCampos],
  usersGet
);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo ingresado no es válido').isEmail(),
    check('email').custom(emailExist),
    check(
      'password',
      'La contraseña debe ser superior a 6 caracteres'
    ).isLength({
      min: 6,
    }),
    // check('role', 'No es un rol váliddo').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom((rol)=> isValidRole(rol)), -> Es igual a lo de abajo
    check('role').custom(isValidRole),
    validarCampos,
  ],
  usersPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(isValidRole),
    validarCampos,
  ],
  usersPut
);

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistById),
    validarCampos,
  ],
  usersDelete
);

router.patch('/', usersPatch);

module.exports = router;

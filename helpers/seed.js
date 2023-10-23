const User = require('../models/user');

const { encryptPassword } = require('./encriptarPassword');

const users = [
  {
    name: 'test 1',
    email: 'test1@test.com',
    password: '123456',
    role: 'USER_ROLE',
  },
  {
    name: 'test 2',
    email: 'test2@test.com',
    password: '123456',
    role: 'USER_ROLE',
  },
  {
    name: 'test 3',
    email: 'test3@test.com',
    password: '123456',
    role: 'USER_ROLE',
  },
  {
    name: 'test 4',
    email: 'test4@test.com',
    password: '123456',
    role: 'USER_ROLE',
  },
  // {
  //   name: 'test 5',
  //   email: 'test5@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 6',
  //   email: 'test6@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 7',
  //   email: 'test7@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 8',
  //   email: 'test8@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 9',
  //   email: 'test9@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 10',
  //   email: 'test10@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 11',
  //   email: 'test11@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 12',
  //   email: 'test12@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 13',
  //   email: 'test13@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 14',
  //   email: 'test14@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
  // {
  //   name: 'test 15',
  //   email: 'test15@test.com',
  //   password: '123456',
  //   role: 'USER_ROLE',
  // },
];

// Ejecuto en el config.js
const seed = () => {
  users.forEach((user) => {
    console.log(`Sembrando user ${user.name}`);
    setTimeout(() => {
      const { name, email, password, role } = user;
      const newUser = new User({ name, email, password, role });

      // Encriptar contraseña
      newUser.password = encryptPassword(user.password);

      newUser.save();
    }, 150);
  });
};

module.exports = {
  seed,
};

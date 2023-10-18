const mongoose = require('mongoose');
const { seed } = require('../helpers/seed');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // No soportada
      // useFindAndModify: true,// No soportada
    });
    console.log('DB online');
    // seed();
  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar DB');
  }
};

module.exports = {
  dbConnection,
};

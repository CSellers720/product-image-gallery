const { Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = new Sequelize('productimages', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// CONNECTION CHECK
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection Established to DB');
  } catch (err) {
    console.error(err);
  }
})();

// Create Model Definitions

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING }
});

const StaticImage = sequelize.define('StaticImage', {
  thumb: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
});

const Image = sequelize.define('Image', {
  thumb: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  metal: { type: DataTypes.STRING },
  carat: { type: DataTypes.INTEGER },
  cut: { type: DataTypes.STRING },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
})

// Sync

const sync = async () => {
  try {
    const results = await sequelize.sync({ force: true });
    console.log(`${Object.keys(results.models)} were synchronized`);
    return Object.keys(results.models);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { sync, Product, StaticImage, Image };
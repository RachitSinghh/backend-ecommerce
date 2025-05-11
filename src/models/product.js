const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/db.js");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  countInStock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product; 

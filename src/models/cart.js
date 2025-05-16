"use strict";
const { Model } = require("sequelize");



module.exports = (sequelize, DataTypes) => {
 
  const Cart = sequelize.define("Cart", {
    userId:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    }, 
    productId:{
      type: DataTypes.INTEGER, 
      allowNull: false, 
    },
    quantity:{
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 1
    },

  },{})

  // Cart.init(
  //   {
  //     userId: DataTypes.INTEGER,
  //     productId: DataTypes.INTEGER,
  //     quantity: DataTypes.INTEGER,
  //   },
  //   {
  //     sequelize,
  //     modelName: "Cart",
  //   }
  // );

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, { foreignKey: "UserId" });
    Cart.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return Cart;
};

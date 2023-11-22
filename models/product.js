/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/*******************************/
/*** Définition du modèle product */
module.exports = (sequelize) => {
  return (Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { paranoid: true, timestamps: false }
  )); // Ici pour faire du softDelete
};

/****************************************/
/*** Ancienne Synchronisation du modèle */
// product.sync()
// product.sync({force: true})
// product.sync({alter: true})

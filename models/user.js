/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/*******************************/
/*** Définition du modèle User */
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true, // Ici une validation de données
        },
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i, // Ici une contrainte
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
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { paranoid: true, timestamps: false }
  ); // Ici pour faire du softDelete

  User.beforeCreate(async (user, options) => {
    try {
      let hash = await bcrypt.hash(
        user.password,
        parseInt(process.env.BCRYPT_SALT_ROUND)
      );
      user.password = hash;
      console.log("user.password");
    } catch (err) {
      console.error("Error hashing password during user creation:", err);
      throw err;
    }
  });

  User.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel);
  };

  return User;
};

/****************************************/
/*** Ancienne Synchronisation du modèle */
//User.sync()
//User.sync({force: true})
//User.sync({alter: true})

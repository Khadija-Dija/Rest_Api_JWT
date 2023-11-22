/*************** */
/***Import des modules nécessaires***/
const { Sequelize } = require("sequelize");

// Exemple d'utilisation de sync

/*************** */
/***Connexion à la base de données***/
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    dialect: "mysql",
    logging: false,
  }
);
/*************** */
/***Mise en place des relation***/
const db = {};
db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);
db.Product = require("./models/product")(sequelize);

/*************** */
/***Définir nos relation***/

//user a plusieurs Product
db.User.hasMany(db.Product, { foreignKey: "user_id", onDelete: "cascade" });
//un Product appartient a un seul user
db.Product.belongsTo(db.User, { foreignKey: "user_id" });

/*************** */
//force: false permet de créer les tables ou les synchroniser a chaque lancement du serveur
db.sequelize.sync({ force: false, alter: true });

module.exports = db;

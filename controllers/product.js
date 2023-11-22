/***********************************/
/*** Import des module nécessaires */
const DB = require("../db.config");
const Product = DB.Product;
const User = DB.User;

/**************************************/
/*** Routage de la ressource product */

exports.getAllProducts = (req, res) => {
  Product.findAll({
    attributes: ["id", "user_id", "nom", "description"],
    paranoid: false,
  })
    .then((products) => res.json({ data: products }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getProduct = async (req, res) => {
  let productId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!productId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Récupération du product
    let product = await Product.findOne({
      where: { id: productId },
      attributes: ["id", "nom", "user_id", "description"],
      include: {
        model: User,
        attributes: ["id", "nom", "pseudo", "email"],
      },
    });

    // Test si résultat
    if (product === null) {
      return res.status(404).json({ message: "This product does not exist !" });
    }

    // Renvoi du product trouvé
    return res.json({ data: product });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addProduct = async (req, res) => {
  const { user_id, nom, description } = req.body;

  // Validation des données reçues
  if (!user_id || !nom || !description) {
    console.log(user_id + nom + description);
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    // Vérification si le coktail existe
    let product = await Product.findOne({ where: { nom: nom }, raw: true });
    if (product !== null) {
      return res
        .status(409)
        .json({ message: `The product ${nom} already exists !` });
    }

    // Céation du product
    product = await Product.create(req.body);
    return res.json({ message: "product Created", data: product });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateProduct = async (req, res) => {
  let productId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    // Recherche du product et vérification
    let product = await Product.findOne({
      where: { id: productId },
      raw: true,
    });
    if (product === null) {
      return res.status(404).json({ message: "This product does not exist !" });
    }

    // Mise à jour du product
    await Product.update(req.body, { where: { id: productId } });
    return res.json({ message: " Updated !!!" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.untrashProduct = (req, res) => {
  let productId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Product.restore({ where: { id: productId } })
    .then(() => res.status(204).json({}))
    .catch((err) => {
      console.error("Error restoring product:", err);
      res.status(500).json({ message: "Database Error", error: err });
    });
};
exports.trashProduct = (req, res) => {
  let productId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Suppression douce du product en définissant la valeur de deletedAt
  Product.update({ deletedAt: new Date() }, { where: { id: productId } })
    .then(() => res.status(204).json({ message: "Soft Deleted !!!" }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

// exports.trashproduct = (req, res) => {
//   let productId = parseInt(req.params.id);

//   // Vérification si le champ id est présent et cohérent
//   if (!productId) {
//     return res.status(400).json({ message: "Missing parameter" });
//   }

//   // Suppression du product
//   product.destroy({ where: { id: productId } })
//     .then(() => res.status(204).json({ message: "Deleted !!!" }))
//     .catch((err) =>
//       res.status(500).json({ message: "Database Error", error: err })
//     );
// };

exports.deleteProduct = (req, res) => {
  let productId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Suppression du product
  Product.destroy({ where: { id: productId }, force: true })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

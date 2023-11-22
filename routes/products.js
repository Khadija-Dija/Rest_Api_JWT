/***********************************/
/*** Import des module nécessaires */
const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const productCtrl = require("../controllers/product");

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router();

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
  const event = new Date();
  console.log("product Time:", event.toString());
  next();
});

/**************************************/
/*** Routage de la ressource Product */

router.get("", productCtrl.getAllProducts);

router.get("/:id", productCtrl.getProduct);

router.put("", checkTokenMiddleware, productCtrl.addProduct);

router.patch("/:id", checkTokenMiddleware, productCtrl.updateProduct);

router.post("/untrash/:id", checkTokenMiddleware, productCtrl.untrashProduct);

router.delete("/trash/:id", checkTokenMiddleware, productCtrl.trashProduct);

router.delete("/:id", checkTokenMiddleware, productCtrl.deleteProduct);

module.exports = router;

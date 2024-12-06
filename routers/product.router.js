const { Router } = require("express");
const {
  deleteData,
  updateData,
  addProduct,
  productData,
  addProductPage,
} = require("../controllers/product.controller");
const { isAuthJwt } = require("../middleware/auth");

const productRouter = Router();

productRouter.post("/addProduct", isAuthJwt, addProduct);

productRouter.get("/addProductPage", isAuthJwt, addProductPage);

productRouter.post("/update", isAuthJwt, updateData);

productRouter.get("/delete/:id", isAuthJwt, deleteData);

productRouter.get("/productData", isAuthJwt, productData);

module.exports = productRouter;

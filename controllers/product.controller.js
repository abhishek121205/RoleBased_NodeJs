const catModel = require("../model/category.schema");
const { product } = require("../model/product.schema");
const jwt = require("jsonwebtoken");

const addProduct = async (req, res) => {
  // const { proName, proDescription, proPrice } = req.body;
  try {
    let { token } = req.cookies;
    var decoded = jwt.verify(token, "it's private");

    if (decoded.role != "ADMIN") throw new Error("You are not admin");

    await product.create(req.body).then((data) => {
      console.log("data inserted");
      return res.redirect("back");
    });

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true
    })
  }
};

const productData = async (req, res) => {
  let catData = await catModel.find({});
  let { token } = req.cookies;
  var decoded = jwt.verify(token, "it's private");
  let proData = await product.find({});
  return res.render("productList", { proData, catData, decoded });
};

const deleteData = async (req, res) => {
  let id = req.params.id;
  try {
    let { token } = req.cookies;
    var decoded = jwt.verify(token, "it's private");

    if (decoded.role != "ADMIN") throw new Error("You are not admin");

    await product.findByIdAndDelete(id);
    console.log("Data deleted");
    return res.redirect("back");
  
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true
    })
  }
};

const updateData = async (req, res) => {
  let id = req.body.id;
  let { proName, proDescription, proPrice, catId } = req.body;
  try {
    await product.findByIdAndUpdate(id, {
      proName,
      proDescription,
      proPrice,
      catId,
    }).then(() => {
      console.log("Data Updated");
    })
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const addProductPage = async (req, res) => {
  let catData = await catModel.find({});
  let { token } = req.cookies;
  var decoded = jwt.verify(token, "it's private");
  return res.render("productForm", { decoded, catData });
};

module.exports = {
  addProduct,
  deleteData,
  updateData,
  productData,
  addProductPage,
};

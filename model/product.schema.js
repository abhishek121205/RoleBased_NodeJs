const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  proName: String,
  proDescription: String,
  proPrice: String,
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryTbl",
  }
});
const product = mongoose.model("productData", userSchema);

module.exports = { product };

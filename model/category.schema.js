const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  CatName: String,
});

const catModel = mongoose.model("categoryTbl", categorySchema);

module.exports = catModel;

const catModel = require("../model/category.schema");
const jwt = require("jsonwebtoken");

const Catcreate = async (req, res) => {
  try {
    let cat = await catModel.create(req.body);
    res.send(cat);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message }); // Added error response
  }
};

const deleteData = async (req, res) => {
  let id = req.params.id;
  try {
    await catModel.findByIdAndDelete(id);
    console.log("Data deleted");
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  let id = req.body.id;
  let { CatName } = req.body;
  try {
    await catModel.findByIdAndUpdate(id, { CatName }).then(()=>{
      console.log("Data Updated");
    });
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const categoryPage = async(req,res)=>{
  let catData = await catModel.find({});
  let { token } = req.cookies;
  var decoded = jwt.verify(token, "it's private");
  return res.render("categoryList",{ catData, decoded })
}

module.exports = { Catcreate, deleteData, updateData, categoryPage };

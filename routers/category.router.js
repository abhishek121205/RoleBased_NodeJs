const { Router } = require("express");
const { Catcreate, updateData, deleteData, categoryPage } = require("../controllers/category.controller");

const catRouter = Router();

catRouter.post("/create", Catcreate);

catRouter.post("/update/", updateData);

catRouter.get("/deleteCat/:id", deleteData);

catRouter.get("/catPage", categoryPage)

module.exports = { catRouter }
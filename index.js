const express = require("express");
const {db} = require('./config/database');
const productRouter = require("./routers/product.router");
const { catRouter } = require("./routers/category.router");
const userRouter = require("./routers/user.router");
const cookies = require('cookie-parser')
const app = express();
const path = require('path')
require("dotenv").config();
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());

app.use(cookies())

app.use('/product',productRouter)
app.use('/category', catRouter)

app.use(userRouter)

app.listen(8089, (err) => {
  db();
  if (!err) {
    console.log("http://localhost:8089");
  }
});
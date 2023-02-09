const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const fs = require("fs");
const pathFile = "./public/data/contacts.json";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.set("layout", "./layout/main");

// akses halaman index
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// akses halaman aboaut
app.get("/about", (req, res) => {
  // res.sendFile("./about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// akses halaman contact dari data json
app.get("/contact", (req, res) => {
  // membuka file
  const file = fs.readFileSync(pathFile, "utf-8");

  // parse data
  const contact = JSON.parse(file);

  res.render("contact", { contact, title: "Contact" });
});

// mengakses page dengan parameter dan menampilkannya
app.get("/product/:idProduct/category/:idCategory", (req, res) => {
  // res.sendFile("./product.html", { root: __dirname });
  res.send(`Produk: ${req.params.idProduct}, Category: ${req.params.idCategory}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Page Not foud : 404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

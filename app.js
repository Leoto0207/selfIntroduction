const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const connectdb = require("./server/database/connection");
const Contactdb = require("./model/model");
const router = express.Router();
const serverless = require("serverless-http");

dotenv.config({ path: "config.env" });

connectdb();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  // res.render("index");
});

router.post("/add_contact", async (req, res) => {
  try {
    const { name, company, email, contact } = req.body;
    const newContact = new Contactdb({ name, company, email, contact });
    await newContact.save();
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`the app started at port ${port}`);
});

// app.use("/.netlify/functions/api", router);
// module.exports.handler = serverless(app);

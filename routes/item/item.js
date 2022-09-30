const express = require("express");
const Router = express.Router();

const ItemService = require("../../service/itemservice");
const itemservice = new ItemService();
const multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ dest: "uploads/", storage });

// Router.get('/',(req,res)=>{
//     res.send('add page');
// });

Router.post("/", upload.single("file"), async function (req, res, next) {
  const data = req.body;
  if (req.file) {
    data.pic = req.file.filename;
  }
  console.log('post', data.prices)
  console.log('parse', JSON.parse(data.prices))


  const i = await itemservice.AddItem(data, req.user);
  res.send(i);
});
Router.patch("/", upload.single("file"), async function (req, res, next) {
  const data = req.body;
  if (req.file) {
    data.pic = req.file.filename;
  }
  console.log(data)

  const i = await itemservice.EditItem(data);
  res.send(i);
});

Router.delete("/", async (req, res) => {
  const i = await itemservice.DeleteItem(req.body.id, req.user);
  res.send(req.params);
});

Router.get("/", async (req, res) => {
  const item = await itemservice.GetItemDetails(req.query.id, req.user);
  res.send(item);
});

module.exports = Router;

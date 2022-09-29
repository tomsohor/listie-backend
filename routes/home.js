const express = require("express");
const Router = express.Router();

const ItemService = require("../service/itemservice");
const itemservice = new ItemService();

Router.get("/", async (req, res) => {
  if (!req.user) {
    console.log('no user')
    res.sendStatus(401)
    return
  }
  const items = await itemservice.GetAllItem(req.user);
  res.send(items);
});

// Router.get("/type/:type", async (req, res) => {
//   const { type } = req.params;
//   const items = await itemservice.GetItemsByType(type, req.user);
//   res.send(items);
// });

module.exports = Router;

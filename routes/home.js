const express = require('express');
const Router = express.Router();

const ItemService = require('../service/itemservice');
const itemservice = new ItemService();


Router.get('/',async(req,res)=>{
    req.query['ownerId'] = req.user;
    if (req.query){
        const items = await itemservice.GetItemByQuery(req.query)
        res.send(items)
    }else{
        const items =  await itemservice.GetAllItem(req.user);
        res.send(items);
    }
    });
   
Router.get('/:type',async(req,res)=>{
        const {type} = req.params
        const items =  await itemservice.GetItemsByType(type,req.user);
        res.send(items);
     });


module.exports = Router;

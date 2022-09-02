const express = require('express');
const Router = express.Router();

const auth = require('../auth/authentication');
const ItemService = require('../service/itemservice');
const itemservice = new ItemService();


// Router.get('/',auth.checkAuthenticated,(req,res)=>{
//     res.send('homepage');
// });

   Router.get('/',async(req,res)=>{
    
    if (req.query){
        const items = await itemservice.GetItemByQuery(req.query)
        res.send(items)
    }else{
        const items =  await itemservice.GetAllItem();
        res.send(items);
    }
    });
   
    Router.get('/:type',async(req,res)=>{
        const {type} = req.params
        const items =  await itemservice.GetItemsByType(type);
        res.send(items);
     });


module.exports = Router;

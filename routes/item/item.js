const express = require('express');
const Router = express.Router();

const ItemService = require('../../service/itemservice');
const itemservice = new ItemService();

// Router.get('/',(req,res)=>{
//     res.send('add page');
// });

Router.post('/',async (req,res)=>{
    const i = await itemservice.AddItem(req.body,req.user);
    res.send(i) 
    
})
Router.patch('/',async (req,res)=>{
    const i = await itemservice.EditItem(req.body);
    res.send(i) 
    
})

Router.delete('/',async (req,res)=>{
    const i = await itemservice.DeleteItem(req.body.id,req.user);
    res.send(req.params) 
})

Router.get('/',async (req,res)=>{
    const item = await itemservice.GetItemDetails(req.query.id,req.user)
    res.send(item);

})

module.exports = Router;

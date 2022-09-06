const express = require('express');
const Router = express.Router();

const ItemService = require('../../service/itemservice');
const itemservice = new ItemService();

// Router.get('/',(req,res)=>{
//     res.send('add page');
// });

Router.post('/add',async (req,res)=>{
    const user = req.user;
    const i = await itemservice.AddItem(req.body,user);
    res.send(i) 
})

Router.put('/edit',async (req,res)=>{
    const i = await itemservice.EditItem(req.body,'cf8b4158-0eab-4c11-b0ea-b0ea19f1b285');
    res.send(i) 
})

Router.delete('/',async(req,res)=>{
    const i = await itemservice.DeleteItem('bb0cce12-af5b-4208-95fd-7c8fc952e75a');
    res.send(i) 
})

Router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const item = await itemservice.GetItemDetails(id)
    res.send(item);

})

module.exports = Router;

const express = require('express');
const Router = express.Router();

const OwnerService = require('../service/ownerService');


const ownerService = new OwnerService();

Router.post('/register',async(req,res)=>{
    const result = await ownerService.Register(req.body);
    res.send(result);
})

Router.post('/login',async(req,res)=>{
    const result = await ownerService.Login(req.body);
    res.send(result);
})

module.exports = Router;

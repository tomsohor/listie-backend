const express = require('express');
const Router = express.Router();

const BNameService = require('../service/b_nameService');
const bnameService = new BNameService();

Router.post('/name/create',async(req,res)=>{
    const result = await bnameService.CreateBName(req.body);
    res.send(result);
})

module.exports = Router;
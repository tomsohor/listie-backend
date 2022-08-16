const express = require('express');
const Router = express.Router();

const {checkAuthenticated} = require('../auth/authentication');
const BNameService = require('../service/businessnameservice');
const bnameService = new BNameService();

Router.get('/name/create',(req,res)=>{
    res.send('name creation')
})

Router.post('/name/create',checkAuthenticated,async(req,res)=>{
    const result = await bnameService.CreateBName(req.body.name,req.user);
    res.send(result);
})

module.exports = Router;
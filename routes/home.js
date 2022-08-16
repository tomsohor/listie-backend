const express = require('express');
const Router = express.Router();

const auth = require('../auth/authentication');


Router.get('/',auth.checkAuthenticated,(req,res)=>{
    res.send('homepage');
});


module.exports = Router;

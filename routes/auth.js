const express = require('express');
const passport = require('passport');
const Router = express.Router();

const {config:passportConfig,checkNotAuthenticated} = require('../auth/authentication');

passportConfig(passport);

const OwnerService = require('../service/ownerservice');
const BusName = require('../service/businessnameservice');

const ownerService = new OwnerService();
const busName = new BusName();

Router.get('/register',checkNotAuthenticated,(req,res)=>{
    res.send('Register page');
})
Router.post('/register',checkNotAuthenticated,async(req,res)=>{
    const result = await ownerService.registerUser(req.body);
    res.send(result);
})

Router.get('/login',checkNotAuthenticated,(req,res)=>{
    res.send('login page');
})

Router.post('/login',checkNotAuthenticated,passport.authenticate('local',{failureRedirect:'/login'}),async(req,res)=>{
    const getBusName = await busName.GetBusName(req.user.id);
  if(!getBusName){
    res.redirect('/bus/name/create');
  }else{
    res.redirect('/');
  }
});

Router.post('/logout', function(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = Router;

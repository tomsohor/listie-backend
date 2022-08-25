const express = require('express');
const passport = require('passport');
const Router = express.Router();

const {config:passportConfig,checkNotAuthenticated, checkAuthenticated} = require('../auth/authentication');

passportConfig(passport);

const OwnerService = require('../service/ownerservice');
const BusName = require('../service/businessnameservice');

const ownerService = new OwnerService();
const busName = new BusName();

Router.get('/register',checkNotAuthenticated,(req,res)=>{
    res.send('register');
})
Router.post('/register',checkNotAuthenticated,async(req,res)=>{
    const result = await ownerService.registerUser(req.body);
    res.send(result);
})

Router.get('/login',checkNotAuthenticated,(req,res)=>{
    res.send('login');
})

Router.post('/login',checkNotAuthenticated,passport.authenticate('local',{ failureRedirect: '/login', failureMessage: true }),async(req,res)=>{
  if(req.user){
    const BusName = await busName.CheckBusName(req.user.id);
    if(!BusName){
      res.redirect('/bus/name/create');
    }else{
      res.redirect('/');
    }
  }
});
  

Router.post('/logout',checkAuthenticated, function(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = Router;

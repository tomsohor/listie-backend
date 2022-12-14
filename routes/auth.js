const express = require('express');
const passport = require('passport');
const Router = express.Router();

const {config:passportConfig,checkNotAuthenticated, checkAuthenticated} = require('../auth/authentication');

passportConfig(passport);

const OwnerService = require('../service/ownerservice');
const ownerService = new OwnerService();

// Register api
// Router.get('/register',checkNotAuthenticated, async(req,res)=>{
//     res.send('register');
// })

Router.post('/register',checkNotAuthenticated,async(req,res)=>{
    const result = await ownerService.registerUser(req.body);
    res.send(result);
})

Router.get('/authenticate',(req,res)=>{
    if(req.user){
      res.sendStatus(200);
    }else{
      res.sendStatus(401);
    }
})

Router.post('/login',
  passport.authenticate('local'),
  async(req, res) => {
    if(req.isAuthenticated()){
      res.send('Successfully Authenticated');
    }
  }
)  

Router.post('/logout', async(req, res)=>{
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = Router;

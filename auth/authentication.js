const LocalStrategy = require('passport-local');
const User = require('../service/ownerservice');
const bcrypt = require('bcrypt');


const config = (passport)=>{
  passport.use(new LocalStrategy(
  async(uname, password, done) => {
    const userService= new User();
    const user = await userService.getUserByUsername(uname);
    if (!user) { return done(null, false,{ msg: 'Incorrect username or password.' }); }
    else{
      if(await bcrypt.compare(password,user.password)){
        return done(null, user);
      }else{
        return done(null, false,{ msg: 'Incorrect username or password.' });
      }
    }}
  ));
  passport.serializeUser((user, done) => {
   done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
   done(null, id);
  });
}

const checkAuthenticated =(req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

const checkNotAuthenticated =(req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = {config,checkAuthenticated,checkNotAuthenticated}

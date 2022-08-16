const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');


require('dotenv').config()


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 360000,
        //secure:true
    }
  }));
app.use(passport.initialize());
app.use(passport.session());




app.use(express.json())
app.use(express.urlencoded({extended:false}))


const dbConfig = require('./db/config');

dbConfig.authenticate()
    .then(()=>console.log('db connected successfully...'))
    .catch(err => console.log(err));

const auth = require('./routes/auth');
const busRoute =  require('./routes/businessname');
const homePage = require('./routes/home');



app.use('/',auth);
app.use('/',homePage);
app.use('/bus',busRoute);


app.listen(process.env.PORT,()=>{
    console.log(`listen to port ${process.env.PORT}`);
})
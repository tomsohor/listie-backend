const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');


require('dotenv').config()

// session handler
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 360000,
        //secure:true
    }
  }));

// initialize passport authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.CLIENT, // <-- location of the react app were connecting to
    credentials: true,
  }))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// Database configuration
const dbConfig = require('./db/config');
dbConfig.authenticate()
    .then(()=>console.log('db connected successfully...'))
    .catch(err => console.log(err));

// acquire route module
const auth = require('./routes/auth');
const homePage = require('./routes/home');
const item = require('./routes/item/item');

// authentication checker
const authChecker = require('./auth/authentication');

app.use('/',auth);
app.use('/',homePage);
app.use('/item',item);

// Create Api documenttation
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./api_ui/apiDoc');

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT,()=>{
    console.log(`listen to port ${process.env.PORT}`);
})
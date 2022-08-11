const express = require('express');
const app = express();

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const dbConfig = require('./db/config');

dbConfig.authenticate()
    .then(()=>console.log('db connected successfully...'))
    .catch(err => console.log(err));

const ownerRoute = require('./routes/ownerRoute');
const busRoute =  require('./routes/b_nameRoute');

app.use('/owner',ownerRoute);
app.use('/bus',busRoute);

app.listen(process.env.PORT,()=>{
    console.log(`listen to port ${process.env.PORT}`);
})
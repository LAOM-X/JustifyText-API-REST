
const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//import Routes
const authRoute = require('./Routes/auth')
dotenv.config();



//connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
()=>{
    console.log('connected to DB')
});


//Middleware
//server.use(bodyParser.json());
server.use(express.json());
//Route Middlewares
server.use('/api/user',authRoute);


server.listen(8080, function(){
        console.log('Server up and running ;)');
 });
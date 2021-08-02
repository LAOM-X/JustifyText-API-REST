
const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import Routes
const authRoute = require('./routes/auth');
const justifyRoute = require('./routes/justify');
dotenv.config();




mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Route Middlewares
server.use('/api/', authRoute);
server.use('/api/justify', justifyRoute);

server.get('/',function (req,res) {
    res.status(200).send('Veuillez consulter le fichier readme');
})
server.listen(process.env.PORT || 3000, function () {
    console.log('Server up and running ;)');
});
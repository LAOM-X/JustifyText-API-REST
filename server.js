// app.js or server.js
require('dotenv').config()



var express = require('express');

var server = express();

//configure routes
server.get('/',function (req,res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super serveur</h1>')


});

// //launch server
// server.listen(8080, function(){
//     console.log('Server en écoute ;)')
// });



// At the bottom of app.js or server.js
const port = process.env.PORT || 3000;
server.listen(port, function(){
        console.log('Server en écoute ;)')
     });
// the code above should be directly above: 'module.exports = app;'
//module.exports = server;
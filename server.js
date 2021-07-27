var express = require('express');

var server = express();

//configure routes
server.get('/',function (req,res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super serveur</h1>')


});

//launch server
server.listen(8080, function(){
    console.log('Server en écoute ;)')
});

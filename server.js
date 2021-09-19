// imports 
import express from 'express'


// Instantiate Server
var server = express();

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html'); //Metre en place l'entête de ma requette reponse http
    res.status(200).send('<h1>Welcome To My Server</h1>')  //200 means success of the request
});


// Launch server 
server.listen(3030, function(){ //Listen to our server || mettre en ecoute notre serveur
    console.log('Server listening :D ')
});
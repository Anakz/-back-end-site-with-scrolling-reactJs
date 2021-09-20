// imports 
// import express from 'express'
// import bodyParser from 'body-parser';
// import apiRouter from './apiRouter@router';

var express = require('express')
var bodyParser = require('body-parser')
var apiRouter = require('./apiRouter.js').router;


// Instantiate Server
var server = express();

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true })); //c'est lui qui va nous permettre de recupérer les arguments/parametres fourni dans le body d'une requette HTTP 

server.use(bodyParser.json()); // On precise que nous velent parser du JSON

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html'); //Metre en place l'entête de ma requette reponse http
    res.status(200).send('<h1>Welcome To My Server</h1>')  //200 means success of the request
});

server.use('/api/', apiRouter);

// Launch server 
server.listen(3030, function(){ //Listen to our server || mettre en ecoute notre serveur
    console.log('Server listening :D ')
});
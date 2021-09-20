// Imports
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import models from '../models'

var bcrypt = require('bcrypt')
var jwtutils = require('../utils/jwt.utils')
var models = require('../models')


// Routes (On definit toute nos routes propre aux utilisateurs) 
// on va exporter depuis notre module toute nos fonctions nos routes(login et registre)
module.exports = {
    register: function(req, res) {
        
        // params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;


        if (email == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        // verify pseaudo lenght, mail regex, password etc.
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword) {
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
                });
            } else {
                return res.status(409).json({'error': 'user already exist'});
            }
        })
        .catch(function(req, res) {
            return res.status(500).json({'error': 'unable to verify user'});
        });


    },
    login: function(req, res) {
        // params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        // Verify 
        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtutils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'invalid password' });
                    } 
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in BD' });
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    }
}
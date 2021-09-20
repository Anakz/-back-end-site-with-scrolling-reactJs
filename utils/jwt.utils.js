var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRECT = '0s48f56s5d0d5ddzedzd466s5dsd446d4z94d44ede4d6s';

// Exported functions
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRECT,
        {
            expiresIn: '1h'
        });
    }
}
'use strict';
const jwt = require('jsonwebtoken');
const secret = require('../config');

function createToken(user) {
    return jwt.sign({ id: user._id, name: user.name }, secret, { algorithm: 'HS256', expiresIn: "1h" });
}
module.exports = createToken;
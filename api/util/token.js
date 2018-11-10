'use strict'

const jwt = require('jsonwebtoken')
const secret = require('../config')

async function createToken(user) {
    return await jwt.sign({ id: user._id, email: user.email }, secret, { algorithm: 'HS256', expiresIn: "1h" })
}
module.exports = createToken
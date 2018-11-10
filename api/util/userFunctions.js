'use strict';

const Joi = require('joi')
const Boom = require('boom')
const bcrypt = require('bcrypt')
const Users = require('../models/users')

const validCreateUser = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    area: Joi.string().required()
})

async function verifyCredentials(email, password) {
    const user = await Users.findOne({ email: email })
    if (user) {
        const isValid = await bcrypt.compare(password, user.password)
        return (isValid) ? user : Boom.badRequest('Usuário ou senha inválida!', false)
    } else {
        return Boom.badRequest('Usuário ou senha inválida!', false)
    }
}

module.exports = {
    validCreateUser: validCreateUser,
    verifyCredentials: verifyCredentials
}
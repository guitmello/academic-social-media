'use strict';

const Joi = require('joi');

const validCreateUser = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

function verifyCredentials(req, res) {
    const password = req.payload.password;

    User.findOne({ email: req.payload.email }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (isValid) {
                    res(user);
                }
                else {
                    res(Boom.badRequest('Senha incorreta!'));
                }
            });
        } else {
            res(Boom.badRequest('Usuário não encontrado!'));
        }
    });
}

module.exports = {
    validCreateUser: validCreateUser,
    verifyCredentials: verifyCredentials
}
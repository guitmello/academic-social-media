const Joi = require('joi')

function validateHeader() {
    return Joi.object({ authorization: Joi.string().required() }).unknown()
}

module.exports = validateHeader
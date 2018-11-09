const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//DUMMY
const UsuariosSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
})

module.exports = mongoose.model('Usuarios', UsuariosSchema);
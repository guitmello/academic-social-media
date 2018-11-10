const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    area: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    created_at:
    {
        type: Date,
        default: Date()
    }
});

module.exports = mongoose.model('Users', userModel)
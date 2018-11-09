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
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', userModel)
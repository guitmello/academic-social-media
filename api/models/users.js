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
    created_at: { type: Date, required: true, default: Date() }
});

module.exports = mongoose.model('Users', userModel)
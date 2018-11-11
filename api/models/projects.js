const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    loading: {
        type: Number,
        min: [0, 'O progresso mínimo é 0%'],
        max: [100, 'O progresso mínimo é 100%']
    },
    likes: {
        type: Number,
        min: [0, 'O mínimo de curtidas é 0']
    },
    photo: {
        type: String,
        default: '/img/default-project.PNG'
    }
});

module.exports = mongoose.model('Projects', ProjectsSchema);
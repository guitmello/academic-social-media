const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    projectId: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: Number
    },
    // images: {
    //     type: 
    // },
    comments: [
        {
            content: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = Mongoose.model('Posts', PostSchema);
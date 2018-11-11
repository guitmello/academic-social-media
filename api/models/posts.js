const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({

    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            requeired: true
        }
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
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
    photo: {
        type: String
    },
    comments: [
        {
            content: {
                type: String,
            },
            user: {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Users',
                },
                name: {
                    type: String
                },
                photo: {
                    type: String
                }
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = Mongoose.model('Posts', PostSchema);
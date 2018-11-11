const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FollowingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        unique: true
    }]
});

module.exports = mongoose.model('Following', FollowingSchema);

/*
    Explicação da collection

    Exemplos de document:
    {
        userId: 3,
        following: [1]
    },
    {
        userId: 55,
        following: [1]
    },
    {
        userId: 90,
        following: [1]
    }

    Significa que os usuário de ID 3, 55 e 90 seguem apenas 1 usuário: o de ID 1
    
*/
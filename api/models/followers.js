const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FollowersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        unique: true
    }]
});

module.exports = mongoose.model('Followers', FollowersSchema);

/*
    Explicação da collection

    Exemplo de document:
    {
        userId : 1,
        followers: [3, 55, 90]
    }

    Significa que o usuário de ID 1 tem 3 seguidores: os usuários que possuem os IDs 3, 55 e 90.
    
*/
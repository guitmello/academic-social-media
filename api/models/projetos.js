const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjetosSchema = new Schema({
    name : { type : String, 
             trim : true , 
             required : true
    },
    createdDate : { type : Date, 
                    default : new Date()
    },
    userid : {
        type : Schema.Types.ObjectId,
        ref : 'Usuarios',
        required : true
    },
    loading : { type : Number, 
                min : [0, 'O progresso mínimo é 0%'], 
                max : [100, 'O progresso mínimo é 100%']
    }
});

module.exports = mongoose.model('Projetos', ProjetosSchema);
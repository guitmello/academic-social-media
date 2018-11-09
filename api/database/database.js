const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/hapijsmongo',  { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', function callback() {
    console.log('Conexão com o banco de dados ativa');
});

exports.db = db;
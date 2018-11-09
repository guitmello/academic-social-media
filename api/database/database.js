const Mongoose = require('mongoose');
const environment = require('../common/environment')

Mongoose.connect(environment.db.url, { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', function callback() {
    console.log('Conexão com o banco de dados ativa');
});

exports.db = db;
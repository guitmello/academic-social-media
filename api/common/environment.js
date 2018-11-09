const environment = {
    server: { port: process.env.SERVER_PORT || 8081 },
    db: { url: process.env.DB_URL || 'mongodb://localhost:27017/hapijsmongo' }
}

module.exports = environment
const mongoose = require('mongoose');
const { connectionString, database } = require('../../config.json');

class Database {
    connect() {
        console.log(`Connecting to database: ${connectionString}/${database}`);
        mongoose.connect(`${connectionString}/${database}`)
            .then(() => {
                console.log('Database connection succesful');
            })
            .catch(err => {
                console.error('Database connection error: ' + err.message);
            });
    }

    disconnect() {
        mongoose.disconnect()
            .then(() => {
                console.log('Disconnected from database');
            });
    }
}

module.exports = new Database();
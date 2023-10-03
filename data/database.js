const mongoConfig = require('../config/db');
const mongoose = require('mongoose');

// console.log(mongoConfig.url);

let database;

const initDb = (callback) => {
    if(database){
        console.log('Db has already been initialized!');
        return callback(null, database);
    } else {
        mongoose.connect(mongoConfig.url, mongoConfig.options)
        .then(() => {
            console.log('Db connected!');
            database = mongoose.connection;
            callback(null, database);
        })
        .catch(err => {
            callback (err);
        });
    }
}

// const getDatabase = () => {
//     if(!database){
//         throw error ('Database not initialized');
//     }
//     else {
//         return database;
//     }
// }

module.exports = {
    initDb
}
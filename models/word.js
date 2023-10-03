const mongoose = require('mongoose');

const wordsSchema = new mongoose.Schema({
    name: String,
    meaning: String,
    partSpeech: String,
    translation: String,
    ipa: String,
    origin: String,
    comments: String
});

module.exports = mongoose.model('Word', wordsSchema);
const mongoose = require('mongoose');

const irregularPluralSchema = new mongoose.Schema({
    plural: String,
    coments: String,
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'words'
    }
});

module.exports = mongoose.model('IrregularPlurals', irregularPluralsSchema);
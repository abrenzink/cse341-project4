const Word = require('../models/word');
const Api404Error = require('../helpers/api404Error');

const getAll = async (req, res) => {
    //#swagger.tags=['Words']
    try {
        const words = await Word.find();
        res.status(200).json(words);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getWordById = async (req, res, next) => {
    //#swagger.tags=['Words']
    try {
        const word = await Word.findById(req.params.id);
        if(!word){
            throw new Api404Error(`Word with id: ${req.params.id} not found.`);
            // return res.status(404).json({message: 'Word not found.'});
        }
        res.status(200).json(word);
    }
    catch(err){
        next(err);
        // res.status(500).json({message: err.message});
    }
};

const createWord = async (req, res) => {
    //#swagger.tags=['Words']
    const { name, meaning, partSpeech, translation, ipa, origin, comments } = req.body;
    try{
        const newWord = new Word ({
            name,
            meaning,
            partSpeech,
            translation,
            ipa,
            origin,
            comments
        });

        const saveWord = await newWord.save();
        res.status(201).json(saveWord);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const updateWord = async (req, res, next) => {
    //#swagger.tags=['Words']
    try{
        const wordId = req.params.id;
        const updatedData = {
            name: req.body.name,
            meaning: req.body.meaning,
            partSpeech: req.body.partSpeech,
            translation: req.body.translation,
            ipa: req.body.ipa,
            origin: req.body.origin,
            comments: req.body.comments
        };
        const updatedWord = await Word.findByIdAndUpdate(wordId, updatedData, {new: true});
        if(!updatedWord){
            throw new Api404Error(`Word with id: ${wordId} not found.`);
            // return res.status(404).json({ message: 'Word not found.' });
        }
        res.status(200).json(updatedWord);
    }    
    catch (err){
        // res.status(500).json({ message: err.message });
        next(err);
    }
};

const deleteWord = async (req, res, next) => {
    //#swagger.tags=['Words']
    try{
        const wordId = req.params.id;
        const deletedWord = await Word.findByIdAndRemove(wordId);
        if (!deletedWord) {
            throw new Api404Error(`Word with id: ${wordId} not found.`);
            // return res.status(404).json({ message: 'Word not found.'  });
        }      
        res.status(204).send(); 
    } catch (err) {
        // res.status(500).json({ message: err.message });
        next(err);
    }
};

module.exports = {
    getAll,
    getWordById,
    createWord,
    updateWord,
    deleteWord
}
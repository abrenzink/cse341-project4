const express = require('express');
const router = express.Router();

const wordsController = require('../controllers/word');
const validation = require('../middleware/validate');

router.get('/', wordsController.getAll);

router.get('/:id', validation.validateId, wordsController.getWordById);

router.post('/', validation.validateWordInfo, wordsController.createWord);

router.put('/:id', validation.validateWordInfo, wordsController.updateWord);

router.delete('/:id', validation.validateId, wordsController.deleteWord);

module.exports = router;
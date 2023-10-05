const router = require('express').Router();

const wordsController = require('../controllers/word');

const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/', wordsController.getAll);

router.get('/:id', [validation.validateId, authenticate.isAuthenticated], wordsController.getWordById);

router.post('/', [validation.validateWordInfo, authenticate.isAuthenticated], wordsController.createWord);

router.put('/:id', [validation.validateWordInfo, authenticate.isAuthenticated], wordsController.updateWord);

router.delete('/:id', [validation.validateId, authenticate.isAuthenticated], wordsController.deleteWord);

module.exports = router;
const validator = require('../helpers/validate');
const mongoose = require('mongoose');

const validateWordInfo = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        meaning: 'required|string',
        partSpeech: 'required|string',
        translation: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
    });
};

const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid ID.' 
      });
  }
  next(); 
};

module.exports = {
  validateWordInfo,
  validateId
}
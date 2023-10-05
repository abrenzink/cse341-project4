const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/', (req, res) => {
    res.send("Project 4 - OAuth - Andrea Brenzink");
});
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
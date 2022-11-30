const ToughtsController = require('../controllers/ToughtsController');
const express = require('express');

const router = express.Router();

router.get('/', ToughtsController.showToughts);

module.exports = router;
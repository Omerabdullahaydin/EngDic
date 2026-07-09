const express = require('express');
const router = express.Router();

const { getAllWords, addWord } = require('../controllers/addWord');

router.get('/', getAllWords);

router.post('/', addWord);

module.exports = router;
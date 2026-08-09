const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookController');

// GET all books
router.get('/', bookController.getAllBooks);

// GET one book by id
router.get('/:id', bookController.getBookById);

module.exports = router;
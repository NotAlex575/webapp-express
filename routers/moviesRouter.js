// importiamo express
const express = require('express');
// importiamo router
const router = express.Router();
// importiamo il controller
const moviesController = require("../controllers/moviesController");

// definizione delle rotte
// index
router.get('/', moviesController.index);

// show
router.get('/:id', moviesController.show);

module.exports = router;

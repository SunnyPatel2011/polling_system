const express = require('express');
const optionsController = require('../controllers/options_controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.delete('/:id/delete',authMiddleware, optionsController.deleteOption)
router.put('/:id/add_vote', optionsController.addVote)

module.exports = router;
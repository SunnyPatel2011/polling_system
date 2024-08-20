const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();
const questionsController = require('../controllers/questions_controller');


router.post('/create',authMiddleware, questionsController.createQuestion);
router.post('/:id/options/create',authMiddleware, questionsController.createOptions);
router.delete('/:id/delete',authMiddleware, questionsController.deleteQuestion);
router.get('/:id',authMiddleware, questionsController.viewQuestion);
router.get('/',authMiddleware, questionsController.fetchquestion);
router.put('/:id/update',authMiddleware, questionsController.updateQuestion);
   


module.exports = router;

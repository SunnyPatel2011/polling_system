const express = require('express');
const { signup, login, getUser } = require('../controllers/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', getUser);

module.exports = router;

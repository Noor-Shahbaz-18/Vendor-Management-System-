const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateUser } = require('../middleware/validate.middleware');

router.post('/register', validateUser, register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
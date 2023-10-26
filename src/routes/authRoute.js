const router = require('express').Router();
const { authController } = require('../controller');
const { verifyToken } = require('../config/tokenHandlers')

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
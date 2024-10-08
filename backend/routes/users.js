const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateToken = require('../middleware/validateTokenMiddleware');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/profile/:id',validateToken,userController.profile);

module.exports = router;

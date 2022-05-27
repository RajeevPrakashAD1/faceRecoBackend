const express = require('express');
const userController = require('./users/userController');
const ruserController = require('./registeredUsers/userController');
const uploadUserImage = require('./util/multer');
const router = express.Router();

router.post('/register', uploadUserImage, ruserController.createUser);
router.get('/registeredUsers', ruserController.getAllUsers);
router.get('/oneRegisteredUser', ruserController.getOneUser);
module.exports = router;

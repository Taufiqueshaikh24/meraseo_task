const express = require('express');
const {
  
     registerUser,
    loginUser,
    Me,
    logoutUser,
    
} = require('../controllers/User');
const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(Me)
router.route('/logout').post(logoutUser);
module.exports = router;

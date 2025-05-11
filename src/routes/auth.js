const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const validate = require('../middlewares/validate.js');
const { protect,adminOnly } = require('../middlewares/authMiddleware.js');

const router = express.Router();



router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('valid email is required'), 
  body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  validate  
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'), 
  body('password').exists().withMessage('Password is required'), 
  validate
], login);
// protected route: Example of a profile route that requires authentication

router.get('/profile', protect, (req,res) =>{

  res.json({
    msg: 'This is the user profile', 
    user: req.user, // the user is added to the request object after JWT validation
  })
})

router.get('/admin', protect, adminOnly, (req,res) =>{
  res.json({
    msg: 'This is the admin-only page', 
  })
})


module.exports = router;
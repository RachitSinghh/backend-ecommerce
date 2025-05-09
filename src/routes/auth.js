const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { validationResult } = require('express-validator');
const validate = require('../middlewares/validate.js')

const router = express.Router();

// const validate = (req, res, next) =>{
//   const errors = validationResult(req); 

//   if(!errors.isEmpty()){
//     return res.status(400).json({errors: errors.array()});
//   }
//   next();
// };


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

module.exports = router;
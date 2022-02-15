const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils')
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();


/* GET users listing. */
router.get('/login', csrfProtection, (req, res) => {
  res.render('userLogin', {
    title:'Login',
    csrfToken: req.csrfToken(),
  })
});

const loginValidator = [
  check('emailAddress')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a correct email address!'),
  check('password')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a correct password value!')
];

router.post('/users/login', csrfProtection, loginValidator, asyncHandler(async(req,res) => {
  const {
    emailAddress,
    password,
  } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { emailAddress }});

  if (user !== null) {
    const passwordCheck = await bcrypt.compare(password, user.hashedPassword.toString());

    if (passwordCheck) {
      loginUser(req, res, user);
      return res.redirect('/');
    }
  }

  errors.push('Login attempt has failed for provided email address and password ya dummy!');
} else {
  errors = validatorErrors.array().map((error) => error.msg);
}

  res.render('userLogin', {
    title: 'Login',
    emailAddress,
    errors,
    csrfToken: req.csrfToken(),
  });
}))

router.post('/users/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/users/login');
})

module.exports = router;

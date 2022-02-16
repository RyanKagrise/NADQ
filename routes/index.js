const express = require('express');

const { requireAuth } = require('../auth')

const router = express.Router();

const { csrfProtection, asyncHandler } = require('./utils')

/* GET home page. */
router.get('/', requireAuth, (req, res, next) => {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;

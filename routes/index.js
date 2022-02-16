const express = require('express');

const {
    requireAuth
} = require('../auth')
const db = require('../db/models')
const router = express.Router();

const {
    csrfProtection,
    asyncHandler
} = require('./utils')

/* GET home page. */
router.get('/', requireAuth, csrfProtection,
    asyncHandler(async (req, res, next) => {

        const topics = await db.Topic.findAll();

        res.render('home', {
            title: 'Never A Dumb Question!',
            topics,
            csrfToken: req.csrfToken(),
        });
    }));

module.exports = router;
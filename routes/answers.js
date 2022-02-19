const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const {
    csrfProtection,
    asyncHandler
} = require('./utils');
const {
    Op
} = require("sequelize");
const db = require("../db/models");

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const {
        content,
        question
    } = req.body;

    const answer = await db.Answer.build({
        content,
        userId: req.params.user.id,
        questionId: question.id
    });

    return answer;
}));



module.exports = router;
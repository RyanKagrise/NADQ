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

const userValidators = [
    check("questionPrompt")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please provide a value for the questionPrompt field!"),
];



router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {

}));

router.post('/search', csrfProtection,
    asyncHandler(async (req, res) => {
        const {
            search,
        } = req.body;

        const questions = await db.Question.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${search.split(' ').join('%')}%`
                }
            }
        });

        console.log(questions);

        res.render('question-search', {
            questions
        });
    }));

router.post('/:id(\\d+)', csrfProtection);




module.exports = router;
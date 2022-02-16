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


router.get('/', csrfProtection, asyncHandler(async(req, res) => {

    const topics = await db.Topic.findAll();


    res.render('ask-question', {
        topics,
        csrfToken: req.csrfToken(),
    })
}))

const questionValidators = [
    check("content")
        .exists({
            checkFalsy: true
        })
        .withMessage("Please provide a value for the questionPrompt field!")
        .isLength({
            max: 255
        })
        .withMessage("The question must be less than 255 characters dummy!"),
    ];




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
            questions,
            csrfToken: req.csrfToken(),
        });
    }));

    router.post('/', csrfProtection, questionValidators, asyncHandler(async (req, res) => {
        const {
            content,
            topicSelector,
        } = req.body;

        const question = db.Question.build({
            content,
            topicId: topicSelector,
            userId: res.locals.user.id,
        })


        const validatorErrors = validationResult(req);

        if(validatorErrors.isEmpty()) {
            await question.save();
            res.redirect(`/questions/${question.id}`)
        } else {
            const errors = validatorErrors.array().map((error => error.msg))

        console.log(errors)

        res.render('ask-question', {
            question,
            errors,
            csrfToken: req.csrfToken(),
        })
    }

}))

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await db.Question.findByPk(questionId);
    const user = await db.User.findByPk(question.userId);
    const topic = await db.Topic.findByPk(question.topicId);

    res.render('question', {
        question,
        user,
        topic,
        csrfToken: req.csrfToken(),
    })
}));




//router.post('/:id(\\d+)', csrfProtection);




module.exports = router;

const express = require("express");
const db = require("../db/models");
const {
    asyncHandler,
    csrfProtection
} = require("./utils");

const router = express.Router();


// router.get('/', (req, res) => {
//     res.render("topics");
// });

router.get("/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const topicId = req.params.id;

    const questions = await db.Question.findAll({
        where: {
            topicId
        },
        include: [
            db.User,
            db.Topic
        ]
    });

    res.render("topics", {
        questions,
        csrfToken: req.csrfToken()
    });
}));


module.exports = router;
const express = require("express");
const db = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();


// router.get('/', (req, res) => {
//     res.render("topics");
// });

router.get("/:id(\\d+)", csrfProtection, asyncHandler(async (req, res) => {
    const topicId = req.params.id;
    const topic = await db.Topic.findByPk(topicId);
    const questions = await db.Question.findAll({ where: { topicId } });
    res.render("topics", { topicName: topic.name, topicId, questions, csrfToken: req.csrfToken() });
}));


module.exports = router;

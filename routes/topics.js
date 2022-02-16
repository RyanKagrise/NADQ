const express = require("express");
const db = require("../db/models");
const { asyncHandler } = require("./utils");

const router = express.Router();


// router.get('/', (req, res) => {
//     res.render("topics");
// });

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const topicId = req.params.id;
    const topic = await db.Topic.findByPk(topicId);
    const questions = await db.Question.findAll({ where: { topicId } });
    res.render("topics", { topicName: topic.name, topicId, questions });
}));


module.exports = router;
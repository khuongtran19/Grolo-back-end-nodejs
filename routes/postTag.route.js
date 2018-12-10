const router = require("express").Router();
const postTagController = require("../controllers/postTag.controller");
const validateBody = require("../filters/validate.body");
const postTag = require("../models/postTag");
module.exports = router;
router.post("/", validateBody(postTag), postTagController.post);
router.get("/:id", postTagController.getById);

const router = require("express").Router();
const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const responses = require("../models/responses/index");
const validateBody = require("../filters/validate.body");
const Post = require("../models/Post");

const postController = require("../controllers/post.controller");

module.exports = router;

router.get("/:pageIndex/:pageSize", postController.getAll);
router.get("/search", postController.search);
router.get("/:id", postController.getById);
router.get("/", postController.getAll);

router.post("/", validateBody(Post), postController.post);
router.delete("/:id", postController.del);

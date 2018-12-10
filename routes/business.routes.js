const router = require("express").Router();

const validateBody = require("../filters/validate.body");
const Business = require("../models/Business");

const businessController = require("../controllers/business.controller");

router.post("/", validateBody(Business), businessController.post);

router.get("/:pageIndex/:pageSize", businessController.getAll);
router.get("/search", businessController.search);
router.get("/:id", businessController.getById);
router.get("/", businessController.getAll);

router.put("/:id", validateBody(Business), businessController.put);

router.delete("/:id", businessController.del);

module.exports = router;

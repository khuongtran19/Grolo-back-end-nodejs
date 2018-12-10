const router = require("express").Router();
const userSelectController = require("../controllers/userSelect.controller");
module.exports = router;
router.get("/search/:pageIndex/:pageSize", userSelectController.search);

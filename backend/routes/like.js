const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");

router.post("/", likeCtrl.like);
router.post("/liked", likeCtrl.liked);


module.exports = router;
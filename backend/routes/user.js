const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-profil");
const auth = require("../middleware/authGetUser");
const authTokenId = require("../middleware/auth");

router.post('/signup', userCtrl.signup)
router.post('/login', multer, userCtrl.login)
router.delete("/delete/:id", userCtrl.delete);
router.put("/modify/:id", authTokenId, multer, userCtrl.modifImg);
router.put("/modifyAccount/:id", authTokenId, userCtrl.modifAccount);
router.put("/modifPassword/:id", authTokenId, userCtrl.modifPassword);
router.post("/", auth, userCtrl.getOne);
router.post("/getAs", auth, userCtrl.getAs);

module.exports = router;
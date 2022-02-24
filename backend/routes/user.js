const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multerProfil");
const auth = require("../middleware/authGetUser");
const authTokenId = require("../middleware/auth");

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post("/", auth, userCtrl.getOne);
router.post("/getAs", auth, userCtrl.getAs);
router.put("/modifImg/:id", authTokenId, multer, userCtrl.modifImg);
router.put("/modifAccount/:id", authTokenId, userCtrl.modifAccount);
router.put("/modifPassword/:id", authTokenId, userCtrl.modifPassword);
router.delete("/delete/:id", userCtrl.delete);

module.exports = router;
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multerProfil");
const auth = require("../middleware/auth");

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)
router.post("/", auth, userCtrl.getOne);
router.post("/getAs", auth, userCtrl.getAs);
router.put("/modifImg/:id", auth, multer, userCtrl.modifImg);
router.put("/modifAccount/:id", auth, userCtrl.modifAccount);
router.put("/modifPassword/:id", auth, userCtrl.modifPassword);
router.delete("/delete/:id", auth, userCtrl.delete);

module.exports = router;
const express = require("express");
const upload = require("../middlewares/multer")

const { handleSignup, handleSignin ,editProfile} = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/signin", handleSignin);

router.post("/edit-profile",upload.single("profileImage"),editProfile)

module.exports = router;

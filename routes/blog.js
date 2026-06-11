const express = require("express");
const upload = require("../middlewares/multer");
const { handleCreateBlog, handleComments } = require("../controllers/blog");
const router = express.Router();

router.post("/", upload.single("coverImageUrl"), handleCreateBlog);

router.post("/comment/:blogId", handleComments);

module.exports = router;

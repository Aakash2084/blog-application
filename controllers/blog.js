const Blog = require("../model/blog");
const Comment = require("../model/comment");
async function handleCreateBlog(req, res) {
  const { title, body } = req.body;

 await Blog.create({
  title,
  body,
  createdBy: req.user._id,
  coverImageUrl: req.file ? req.file.path : undefined,
});

  return res.redirect("/");
}

async function handleComments(req, res) {
  try {
    if (!req.user) {
      return res.redirect("/signin");
    }

    const content = req.body.content?.trim();

    if (!content) {
      const blog = await Blog.findById(req.params.blogId).populate("createdBy");
      const comments = await Comment.find({
        blogId: req.params.blogId,
      }).populate("createdBy");

      return res.render("blog", {
        blog,
        comments,
        user: req.user,
        error: "Comment cannot be empty",
      });
    }

    await Comment.create({
      content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    return res.redirect(`/view-blog/${req.params.blogId}`);
  } catch (error) {
    console.error(error);

    const blog = await Blog.findById(req.params.blogId).populate("createdBy");
    const comments = await Comment.find({
      blogId: req.params.blogId,
    }).populate("createdBy");

    return res.render("blog", {
      blog,
      comments,
      user: req.user,
      error: "Something went wrong",
    });
  }
}

module.exports = {
  handleCreateBlog,
  handleComments,
};

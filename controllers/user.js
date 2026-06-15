const User = require("../model/user");

async function handleSignup(req, res) {
  const body = req.body;

  const user = await User.create({
    fullName: body.fullName,
    email: body.email,
    password: body.password,
  });
  return res.render("signin");
}

async function handleSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassqwordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "incorrect email or password",
    });
  }
}
async function editProfile(req, res) {
  const { fullName, email } = req.body;

  const user = await User.findById(req.user._id);

  const updateData = {
    fullName,
    email,
  };

  if (req.file) {
    updateData.profileImage = req.file.path;
  }

  const update = await User.findByIdAndUpdate(
    user._id,
    updateData,
    { new: true }
  );

  console.log("Updated User:", update);
  return res.redirect("/profile");
}

module.exports = {
  handleSignup,
  handleSignin,
  editProfile,
};

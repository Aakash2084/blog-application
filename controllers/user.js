const User = require("../model/user");

async function handleSignup(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.render("signup", {
        error: "Email already registered",
      });
    }

    await User.create({
      fullName,
      email: normalizedEmail,
      password,
    });

    return res.render("signin", {
      success: "Account created successfully. Please sign in.",
    });

  } catch (error) {
    console.error(error);

    return res.render("signup", {
      error: "Something went wrong",
    });
  }
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

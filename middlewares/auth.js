const { checkToken } = require("../services/authentication");
const User = require("../model/user");

function validateUserAuthentication(cookieName) {
  return async (req, res, next) => {
    const cookieTokenValue = req.cookies[cookieName];

    if (!cookieTokenValue) {
      return next();
    }

    try {
      const payload = checkToken(cookieTokenValue);

      const user = await User.findById(payload._id);

      req.user = user;
    } catch (error) {
      console.log(error);
    }

    return next();
  };
}

module.exports = {
  validateUserAuthentication,
};

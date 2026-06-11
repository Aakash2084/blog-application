const JWT = require("jsonwebtoken");

function createWebToken(user) {
  const payload = {
    _id: user._id,
   
  };
  const token = JWT.sign(payload,  process.env.JWT_SECRET);
  return token;
}

function checkToken(token) {
  const payload = JWT.verify(token, process.env.JWT_SECRET);

  return payload;
}

module.exports = {
  createWebToken,
  checkToken,
};

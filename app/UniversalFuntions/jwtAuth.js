const jwt = require("jsonwebtoken"),
  config = require("../config/constants")

exports.jwtSign = async (userId, email) => {
  return jwt.sign(
    {
      email,
      userId
    },
   config.JWT_KEY
  );
}

exports.jwtVerify = async (token) => {
  return await jwt.verify(token, config.JWT_KEY);
}
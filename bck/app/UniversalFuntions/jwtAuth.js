const jwt = require("jsonwebtoken"),
  config = require("../config/constants")

exports.jwtSign = async (userId, email , type) => {
  return jwt.sign(
    {
      email,
      userId, type
    },
   config.JWT_KEY
  );
}

exports.jwtVerify = async (token) => {
  return await jwt.verify(token, config.JWT_KEY);
}
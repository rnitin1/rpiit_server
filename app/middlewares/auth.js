const jwt = require('jsonwebtoken');

exports.jwtSign = async (userId, email) => {
  try {
    return jwt.sign(
      {
        email,
        userId,
      },
      process.env.JWT_KEY
    );
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.userAuth = (req, res, next) => {
  try {
    let token = req.headers.accesstoken;
    if (req.body.creatorId) {
      next();
    } else {
      jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) return res.status(401).send({ message: 'Invalid token' });
        req.user = decode;
        next();
        return;
      });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

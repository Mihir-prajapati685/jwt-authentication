
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "token not geting", success: false });
    }
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
          if (err) {
              return res.status(400).json({ message: 'invalid token', err });
          }
        
          next();
    });
  } catch (error) {
    res.status(400).json({ message: "something error", error });
  }
};
module.exports = authmiddleware;

// const authschema = require('../modles/Auth').authschemadata;
const authschemadata = require("../modles/Auth");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerpost = async (req, res) => {
  try {
    const { email, password, conformpass } = req.body;
    console.log(req.body);
    if (!email || !password || !conformpass) {
      return res.status(400).json({
        message: "somthing misssing to register",
        success: false,
      });
    }
    const findealready = await authschemadata.findOne({ email });
    if (findealready) {
      return res.status(400).json({
        message: "user already register",
        success: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const postdata = await authschemadata.create({
      email,
      password: hashpassword,
      conformpass,
    });
    console.log(postdata);
    if (postdata) {
      return res.status(201).json({
        message: "register successfully",
        success: true,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: "not saving data" });
  }
};
exports.loginpost = async (req, res) => {
    try {
      const { emaildata, passdata } = req.body;
      if (!emaildata || !passdata) {
        return res.status(400).json({
          message: "Something missing in request data",
          success: false,
        });
      }
      const user = await authschemadata.findOne({ email: emaildata });
      if (!user) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }
  
      const matchPass = await bcrypt.compare(passdata, user.password);
      if (!matchPass) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
      // Confirm that the secret key is defined
      const tokenPayload = {
        email: user.email,
      };
  // Generate the token
      const token = await jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '2d' });
      console.log("Generated Token:", token);

      // Return the token in a cookie and in the response body
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === 'production',
        })
        .json({
          message: 'Login successfully',
          token: token,
          success: true,
        });
      
    } catch (error) {
      console.log("Error in loginpost:", error.message);
      res.status(400).json({ error: "Backend error" });
    }
  };
  
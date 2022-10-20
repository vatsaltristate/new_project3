const db = require("../../models");
const User = db.user;
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const PRIVATE_KEY = "vatsal123";

module.exports = {
  checkEmailPassword: async (req, res, next) => {
    const response = await User.findOne({
      where: { email: req.body.email },
      attributes: ["password"],
    });

    if (!response)
      res.send({
        success: 0,
        message: "User not found in database please signup",
      });

    // console.log('aaya :: ', response)
    const usersHashedPassword = response.dataValues.password;
    // console.log('le aaya  :: ', usersHashedPassword)

    const result = compareSync(req.body.password, usersHashedPassword);

    if (!result)
      return res.send({
        success: 0,
        message: "Incorrect password, please try again",
      });

    next();
  },

  tokenVerification: (req, res, next) => {
    
    let token = req.get("authorization");
    // console.log(token, " :: tokenauth")

    if (token) {
      token = token.slice(7);
      verify(token, PRIVATE_KEY, (error, decode) => {
        if (error) {
          res.json({
            code: 403,
            message:
              "ohho sorry! token authentication failed please try again !!!",
          });
        } else{
          req.body;
          next();
        }
      });
    }
  },
};

const { User } = require("../models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { sendWelcomeEmail } = require('../utilities/mail');
const validator = require("../middleware/validation/user.schema");

const PRIVATE_KEY = "vatsal123";

class UserController {
  async signupUser(req, res) {
    try {
      await validator.userValidation(req.body);
      await validator.doesAlreadyExist(req.body);
      var user = await User.create(req.body);
      const jwt = sign({}, PRIVATE_KEY, { expiresIn: "24h" });
      var token = jwt;

      res.status(201).json({ data: user, token : jwt , status: 201 });


    } catch (error) {
      console.log(error, " :: :: :: :: :: error")
      res
        .status(error.status || 500)
        .json({ message: error.message, status: error.status || 500 });
    }
    sendWelcomeEmail(req.body.email, req.body.firstName, token)
    
  }
  async loginUser(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        attributes: ["password"],
      });
      if (!user) {
        throw new Error("email not found");
      }
      // console.log("user", user);
      await user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch == true) {
          const jwt = sign({}, PRIVATE_KEY, { expiresIn: "24h" });
          // const response = await User.update(
          //   { token: jwt },
          //   {
          //     where: { email: req.body.email }, 
          //   }
          // );
          return res.status(200).json({
            success: 200,
            message : "your email verification complete",
            token : jwt
          });
        }
        throw new Error("password not match");
      });
    } catch (err) {
      res.status(401).json({ message: err.message, status: 401 });
    }
  }

    // async accountActivate (req, res) {
    //   try {
        
    //   }catch(error){
    //   res.status(401).json({ message: err.message, status: 401 });
    //   }
    // }

  // async findAllUser(req, res) {
  //   try {
  //     const firstName = req.query.firstName;
  //     var condition = firstName
  //       ? { firstName: { [Op.iLike]: `%${firstName}%` } }
  //       : null;
  //     var users = await User.findAll({ where: condition });
  //     console.log(users, ':: :: :: USER')
  //     return res.status(200).json({
  //       status: 200,
  //       data: users,
  //     });
  //   } catch (err) {
  //     res.status(501).json({ message: err.message, status: 501 });
  //   }
  // }

  // async findOneUser(req, res) {
  //   try {
  //     const id = req.params.id;

  //     var users = await User.findByPk(id);
  //     // console.log(users);
  //     return res.status(200).json({
  //       status: 200,
  //       data: users,
  //     });
  //   } catch (err) {
  //     res.status(501).json({ message: err.message, status: 501 });
  //   }
  // }

  // async deleteUser(req, res) {
  //   try {
  //     var id = req.params.id;
  //     // await validator.enterID(req.params.id);
  //     var users = await User.destroy({ where: { id: id } });
  //     if (users == 1) {
  //       res.send({ message: "user data delete successfully" });
  //     } else {
  //       res.send({ message: "user data can not delete" });
  //     }
  //   } catch (err) {
  //     res.status(501).json({ message: err.message, status: 501 });
  //   }
  // }

  // async updateUser(req, res) {
  //   try {
  //     const id = req.body.id;
  //     const body = req.body;
  //     const salt = genSaltSync(10);
  //     body.password = hashSync(body.password, salt);
  //     await validator.userValidation(req.body);
  //     await validator.doesAlreadyExist(req.body);
  //     const users = await User.update(req.body, { where: { id: id } });

  //     if (users == 1) {
  //       res.send({ message: "data update successfully" });
  //     } else {
  //       res.send({ message: "data not updated" });
  //     }
  //   } catch (err) {
  //     res.status(501).json({ message: err.message, status: 501 });
  //   }
  // }
}

module.exports = new UserController();

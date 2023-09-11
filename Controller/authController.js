const Joi = require("joi");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const UserDto = require("../dto/user");
const UserDTO = require("../dto/user");

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/;

const authController = {
  async register(req, res, next) {
    // validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    //2. if error in validation return error via middleware

    if (error) {
      return next(error);
    }
    //3. if email or username is already registered return an error
    const { username, name, email, password } = req.body;
    //check if email is not already  register

    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email adress already registered, use another email adress",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username not available, choose another different username!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    //store user data in database
    const userToRegister = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });
    const user = await userToRegister.save();

    //6. response send
    const userDto = new UserDTO(user);
    return res.status(201).json({ user: userDto });
  },

  async login(req, res, next) {
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, password } = req.body;

    //const username = req.body.username;
    let user;

    try {
      //match usernae
      user = await User.findOne({ username });
      if (!user) {
        const error = {
          status: 401,
          message: "User Not Found",
        };
        return next(error);
      }
      //match password
      //req.body.password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = {
          status: 401,
          message: "invalid password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto });
  },
};

module.exports = authController;

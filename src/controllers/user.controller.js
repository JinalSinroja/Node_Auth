import apiResponse from '../helpers.js/apiResponse.helper.js';
import { generateAccessToken } from '../helpers.js/jwt.helper.js';
import { userService } from '../services/user.service.js';

const register = async (req, res, next) => {
  try {
    const { email, first_name, last_name, password, dob, photo } = req.body;
    console.log(
      '🚀 ~ file: user.controller.js:8 ~ register ~ req.body:',
      req.body
    );

    const payload = {
      email: email.toLowerCase(),
      first_name,
      last_name,
      password,
      dob,
      photo,
    };

    let userData = await userService.add(payload);

    const token = generateAccessToken({
      email: userData.email,
      _id: userData._id,
      role: userData.role,
      username: userData.first_name + ' ' + userData.last_name,
    });

    userData = { ...userData._doc, token: token };

    apiResponse(res, {
      code: 201,
      status: 200,
      message: 'account created.',
      data: userData,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        status: 400,
        message: 'Email address already register with us',
      });
    } else next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, token } =
      req.body;
      console.log("🚀 ~ file: user.controller.js:53 ~ login ~ req.body:", req.body)
    let match = {};
    if (email) {
      match = { email: email.toLowerCase() };
    }
    let userRes = await userService.getByUser(match);
    if (!userRes) {
      throw new Error("email id doesn't exist.");
    }
    userService
      .login({ email, password })
      .then((user) => {
        if (user.msg === 'inCorrect') {
          return apiResponse(res, {
            code: 400,
            status: 400,
            message: 'Username or Password is incorrect',
          });
        } else if (user.msg === 'notFound') {
          return apiResponse(res, {
            code: 400,
            status: 400,
            message:
              'User details not found. Please check your details or Sign Up.',
          });
        } else {
          return res.cookie('token', user.token, {}).status(200).json({
            code: 200,
            status: 200,
            data: user,
            message: 'login successfully.',
          });
        }
      })
      .catch((e) => next(e));
  } catch (e) {
    next(e);
  }
};

const getProfile = (req, res, next) => {
  console.log("🚀 ~ file: user.controller.js:94 ~ getProfile ~ req:", req)
  const { _id } = req.user;
  userService
      .getByUser({ _id })
      .then((user) =>
          apiResponse(res, {
              code: 200,
              status: 200,
              data: user,
          })
      )
      .catch((e) => next(e));
};

export { register, login, getProfile };

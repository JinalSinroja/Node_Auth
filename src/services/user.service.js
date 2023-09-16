import { generateAccessToken } from '../helpers.js/jwt.helper.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs'

const add = async (params) => {
  const newUser = new UserModel(params);
  return await newUser.save();
};

const login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (user && !bcrypt.compareSync(password, user.password)) {
    // incorrect
    return { msg: 'inCorrect' };
  } else if (!user) {
    return { msg: 'notFound' };
  } else if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateAccessToken({
      email,
      _id: user._id,
      role: user.role,
      username: user.first_name + ' ' + user.last_name,
    });
    return { ...user.toJSON(), token };
  }
};

const getByUser = async (query) => {
  return await UserModel.findOne(query);
};

export const userService = { add, login, getByUser };

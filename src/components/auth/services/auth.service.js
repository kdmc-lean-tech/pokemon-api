const User = require('../models/user.model');
const { encryptPassword } = require('../../../utils/bcryptjs/encrypt.utils');
const { Types } = require('mongoose');
const { getRoleByName } = require('../../roles/services/roles.service');
const { userLookup } = require('./lookups/user.lookups');

const registerUser = async (user) => {
  const { password } = user;
  user.password = encryptPassword(password);
  const defaultRole = await getRoleByName('user');
  user.roleId = defaultRole;
  const newUser = new User(user);
  await newUser.save();
  return newUser;
}

const getUser = async(userId) => {
  return await User.aggregate([
    { $match: { _id: Types.ObjectId(userId) } },
    { $lookup: userLookup },
    { $unwind: '$roleId' }
  ]).then(user => user[0]);
}

const getUserByEmail = async (userEmail) => {
  return await User.aggregate([
    { $match: { email: userEmail } },
    { $lookup: userLookup },
    { $unwind: '$roleId' }
  ]).then(user => user[0]);
}

const activeUserByEmail = async (email) => {
  const user =  await getUserByEmail(email);
  return await User.updateOne(
    { _id: Types.ObjectId(user._id) },
    { $set: { active: true } }
  )
}

const changePassword = async (password, user) => {
  const newPassword = encryptPassword(password);
  return await User.updateOne(
    {
      _id: Types.ObjectId(user._id)
    },
    { $set: { password: newPassword } }
  );
}

module.exports = {
  registerUser,
  getUser,
  getUserByEmail,
  activeUserByEmail,
  changePassword
}

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

const setOnlineStatus = async (userId, status) => {
  return await User.updateOne(
    {
      _id: Types.ObjectId(userId)
    },
    { $set: { online: status } }
  );
}

const getSocketUsersById= async (userId, search) => {
  return await User.aggregate(
    [
      { $match: 
        {
          $and: [
            { _id: { $ne: userId } },
            { active: true },
            {  name: { $regex: search ? search : '', $options: 'i' } }
          ]
        }
      },
      { $sort: { online: -1 } },
      { 
        $project: {
          name: 1,
          online: 1
        }
      }
    ]
  );
}

const getSocketUsers= async () => {
  return await User.aggregate(
    [
      { $match: { active: true } },
      { $sort: { online: -1 } },
      { 
        $project: {
          name: 1,
          online: 1
        }
      }
    ]
  );
}

module.exports = {
  registerUser,
  getUser,
  getUserByEmail,
  activeUserByEmail,
  changePassword,
  setOnlineStatus,
  getSocketUsers,
  getSocketUsersById
}

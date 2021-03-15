const User = require('../models/user.model');
const { encryptPassword } = require('../../../utils/bcryptjs/encrypt.utils');
const { Types } = require('mongoose');
const { getRoleByName } = require('../../roles/services/roles.service');
const { roleLookup, avatarLookup } = require('./lookups/user.lookups');
const { getMessagesFromUser, getMessagesFromUsers } = require('../../messages/services/messages.service');

const registerUser = async (user) => {
  const { password } = user;
  user.password = encryptPassword(password);
  const defaultRole = await getRoleByName('user');
  user.roleId = defaultRole;
  return User.create(user);
}

const getUser = async(userId) => {
  return await User.aggregate([
    { $lookup: avatarLookup },
    { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } },
    { $match: { _id: Types.ObjectId(userId) } },
    { $lookup: roleLookup },
    { $unwind: '$roleId' }
  ]).then(user => user[0]);
}

const getUserByEmail = async (userEmail) => {
  return await User.aggregate([
    { $match: { email: userEmail } },
    { $lookup: roleLookup },
    { $unwind: '$roleId' },
    { $lookup: avatarLookup },
    { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } }
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

const getSocketUsers= async (search, userId) => {
  const results = await User.aggregate(
    [
      { $lookup: avatarLookup },
      { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } },
      { $match:
        {
          $and: [
            { active: true },
            { name: { $regex: search ? search : '', $options: 'i' } }
          ]
        },
      },
      { $sort: { online: -1 } },
      {
        $project: {
          name: 1,
          online: 1,
          'avatar.url': 1
        }
      }
    ]
  );
  const users = await getMessagesFromUsers(results, userId);
  return users;
}

const updateAvatarUser = async (user, avatar) => {
  user.avatar = avatar._id;
  return await User.updateOne(
    { _id: Types.ObjectId(user._id) },
    { $set: user }
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
  updateAvatarUser
}

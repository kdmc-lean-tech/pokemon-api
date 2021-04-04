const User = require('../models/user.model');
const { encryptPassword } = require('../../../utils/bcryptjs/encrypt.utils');
const { Types } = require('mongoose');
const { getRoleByName } = require('../../roles/services/roles.service');
const { getMessagesFromUsers } = require('../../messages/services/messages.service');

const registerUser = async (user) => {
  const { password } = user;
  user.password = encryptPassword(password);
  const defaultRole = await getRoleByName('user');
  user.roleId = defaultRole;
  return User.create(user);
}

const getUser = async(userId) => {
  return await User.findOne({
    _id: Types.ObjectId(userId)   
  })
    .populate('avatar')
    .populate('role')
}

const getUserByEmail = async (userEmail) => {
  return await User.findOne({
    email: userEmail
  })
    .populate({
      path: 'roleId',
      populate: {
        path: 'permissions'
      }
    })
    .populate({
      path: 'roleId',
      populate: {
        path: 'modules'
      }
    })
    .populate('avatar')
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
  const results = await User.find({
    $and: [
      { name: { $regex: search ? search : '', $options: 'i' } },
      { active: true }
    ]
  })
    .sort({ online: -1 })
    .populate({
      path: 'avatar',
      select: 'url'
    })
    .exec();

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

const editProfileUser = async (userId, user) => {
  const { name } = user;
  return await User.updateOne(
    { _id: Types.ObjectId(userId) },
    { $set: { name } }
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
  updateAvatarUser,
  editProfileUser
}

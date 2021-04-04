const Message = require('../models/messages.model');
const { Types } = require('mongoose');

const getMessages = async (userId, messageOf) => {
  return await Message.find({
    $or: [
      { $and: [ { to: Types.ObjectId(messageOf) }, { of: Types.ObjectId(userId) } ] },
      { $and: [ { to: Types.ObjectId(userId) },    { of: Types.ObjectId(messageOf) }] }
    ]
  })
    .sort({ createdAt: 1 })
    .populate('user')
    .populate('of')
    .populate('to')
    .exec();
}

const getMessagesFromUsers = async (users, userId) => {
  const newUsers = [];
  users.forEach(user => {
    newUsers.push(getMessagesFromUser(user, userId));
  });
  return Promise.all(newUsers);
}

const getMessagesFromUser = async (user, to) => {
  const totalMessages = await getMessages(to, user._id);
  return {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    online: user.online,
    totalMessages: totalMessages.filter(m =>
      String(m.of._id) === String(user._id)
      &&
      m.seen === false
    ).length
  }
}

const getMessagesCount = async (userId, messageOf) => {
  return await Message.find({
    $or: [
      { $and: [ { to: Types.ObjectId(messageOf) }, { of: Types.ObjectId(userId) } ] },
      { $and: [ { to: Types.ObjectId(userId) },    { of: Types.ObjectId(messageOf) }] }
    ]
  })
    .sort({ createdAt: 1 })
    .countDocuments();
}

const saveMessage = async (chatMessage) => {
  chatMessage.seen = false;
  return await Message.create(chatMessage);
}

const seeMessage = async (messageId) => {
  await Message.updateMany(
    { _id: Types.ObjectId(messageId) },
    { $set: { seen: true } }
  );
}

const getMessage = async (messageId) => {
  return await Message.findOne({
    _id: Types.ObjectId(messageId)
  })
    .populate('user')
    .populate('of')
    .populate('to');
}

module.exports = {
  getMessages,
  saveMessage,
  getMessagesCount,
  seeMessage,
  getMessage,
  getMessagesFromUser,
  getMessagesFromUsers
}

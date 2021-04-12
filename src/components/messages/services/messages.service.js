const Message = require('../models/messages.model');
const { Types } = require('mongoose');

const getMessages = async (userId, messageOf, paginator) => {
  const results = await Message.find({
    $or: [
      { $and: [ { to: Types.ObjectId(messageOf) }, { of: Types.ObjectId(userId) } ] },
      { $and: [ { to: Types.ObjectId(userId) },    { of: Types.ObjectId(messageOf) }] }
    ]
  })
    .sort({ createdAt: -1 })
    .skip(paginator.offset) // TODO: Implement paginator here......
    .limit(paginator.limit)
    .populate({
      path: 'of',
      select: 'name'
    })
    .populate({
      path: 'to',
      select: 'name'
    });
  return results.reverse();
}

const getLimitMessages = async (userId, messageOf) => {
  return await Message.find({
    $and: [
      {
        $or: [
          { $and: [ { to: Types.ObjectId(userId) }, { of: Types.ObjectId(messageOf) }] }
        ]
      },
      { seen: false }
    ]
  })
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
  const totalMessages = await (await getLimitMessages(to, user._id)).length;
  return {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    online: user.online,
    totalMessages
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
  getMessagesFromUsers,
  getLimitMessages
}

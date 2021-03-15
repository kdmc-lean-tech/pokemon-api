const Message = require('../models/messages.model');
const { Types } = require('mongoose');
const { userOfLookup, userToLookup } = require('./lookups/messages.lookup');

const getMessages = async (userId, messageOf) => {
  return await Message.aggregate([
    { $match: 
      {
        $or: [
          { $and: [ { to: Types.ObjectId(messageOf) }, { of: Types.ObjectId(userId) } ] },
          { $and: [ { to: Types.ObjectId(userId) },    { of: Types.ObjectId(messageOf) }] }
        ]
      }
    },
    { $sort: { createdAt: 1 } },
    { $lookup: userOfLookup },
    { $unwind: '$of' },
    { $lookup: userToLookup },
    { $unwind: '$to' },
  ])
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
    ...user,
    totalMessages: totalMessages.filter(m =>
      String(m.of._id) === String(user._id)
      &&
      m.seen === false
    ).length
  }
}

const getMessagesCount = async (userId, messageOf) => {
  return await Message.aggregate([
    { $match: 
      {
        $or: [
          { $and: [ { to: Types.ObjectId(messageOf) }, { of: Types.ObjectId(userId) } ] },
          { $and: [ { to: Types.ObjectId(userId) },    { of: Types.ObjectId(messageOf) }] }
        ]
      }
    },
    { $sort: { createdAt: 1 } },
    { $count: 'name' }
  ]).then(response => response[0] ? response[0].name : 0);
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
  return await Message.aggregate(
    [
      { $match: { _id: Types.ObjectId(messageId) } },
      { $lookup: userOfLookup },
      { $unwind: '$of' },
      { $lookup: userToLookup },
      { $unwind: '$to' },
    ]
  ).then(response => response[0]);
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

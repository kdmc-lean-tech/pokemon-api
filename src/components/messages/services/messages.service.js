const Message = require('../models/messages.model');

const getMessages = async (userId, messageOf) => {
  return await Message.find({
    $or: [
      { of: userId, to: messageOf },
      { of: messageOf, to: userId }
    ]
  })
  .sort({ createdAt: 1 })
}

const saveMessage = async (chatMessage) => {
  const newMessage = new Message(chatMessage);
  return await newMessage.save();
}

module.exports = {
  getMessages,
  saveMessage
}

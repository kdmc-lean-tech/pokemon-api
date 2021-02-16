const Message = require('../models/messages.model');

const getMessages = async (userId, messageOf) => {
  return await Message.aggregate(
    [
      { $match: 
        {
          $or: 
            [
              { of: userId, to: messageOf },
              { of: messageOf, to: userId }
            ]
        }
      },
      { $sort: { createdAt: -1 } },
      { $limit: 30 }
    ]
  );
}


module.exports = {
  getMessages
}

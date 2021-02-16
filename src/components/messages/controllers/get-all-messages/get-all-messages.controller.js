const { getMessages } = require('../../services/messages.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getMessagesController = async (req, res) => {
  const { _id } = req.user;
  const messageOf = req.params.of;
  try {
    const messages = await getMessages(_id, messageOf);
    return successResponse(res, messages);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getMessagesController
}

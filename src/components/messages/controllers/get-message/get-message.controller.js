const { getMessage } = require('../../services/messages.service');
const {
  successResponse,
  notFoundError,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getMessageController = async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await getMessage(messageId);
    if (!message) {
      return notFoundError(res);
    }
    return successResponse(res, message);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getMessageController
}

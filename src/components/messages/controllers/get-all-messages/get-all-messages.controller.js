const { getMessages } = require('../../services/messages.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorScroll
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getMessagesController = async (req, res) => {
  const { _id } = req.user;
  const messageOf = req.params.of;
  const queries = req.query;
  try {
    const paginator = paginatorScroll(queries);
    const messages = await getMessages(_id, messageOf, paginator);
    return successResponse(res, messages);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getMessagesController
}

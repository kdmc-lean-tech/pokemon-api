const { editProfileUser, getUser } = require('../../services/auth.service');
const {
  internalServerError,
  notFoundError,
  successResponse
} = require('../../../../utils/result-response/result-response.utils');

const editProfileController = async (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  try {
    const user = await getUser(userId);
    if (!user) {
      return notFoundError(res);
    }
    const result = await editProfileUser(userId, body);
    return successResponse(res, result);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  editProfileController
}

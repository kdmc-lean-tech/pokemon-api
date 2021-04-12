const { removeImageAndS3Resource, getImage } = require('../../services/uploads.service');
const { getUser, updateAvatarUser } = require('../../../../auth/services/auth.service');
const {
  successResponse,
  internalServerError
} = require('../../../../../utils/result-response/result-response.utils');

const uploadAvatarUserController = async (req, res) => {
  try {
    const avatar = req.image;
    const userId = req.params.id;
    const user = await getUser(userId);
    if (!user) {
      return notFoundError(res);
    }
    if (!!user.avatar) {
      const image = await getImage(user.avatar._id);
      await removeImageAndS3Resource(image);
    }
    const userEdit = await updateAvatarUser(user, avatar);
    return successResponse(res, userEdit);
  } catch (error) {
    await removeImageAndS3Resource(req.image);
    return internalServerError(res, error);
  }
}

module.exports = {
  uploadAvatarUserController
}

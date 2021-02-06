const { registerUser, getUserByEmail } = require('../../services/auth.service');
const {
  successResponse,
  internalServerError,
  clientError
} = require('../../../../utils/result-response/result-response.utils');

const registerController = async (req, res) => {
  const user = req.body;
  const { email } = user;
  try {
    const userExist = await getUserByEmail(email);
    if (userExist) {
      return clientError(res, `The user with email ${ email } already exists.`);
    }
    const newUser = await registerUser(user);
    // TODO: Send email to new User....
    return successResponse(res, newUser);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  registerController
}

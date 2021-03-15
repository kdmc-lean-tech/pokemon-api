const { Router } = require('express');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { buildCheckFunction } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { uploadsMiddleware } = require('../../middlewares/uploads/uploads');
const {
  uploadAvatarUserController,
  uploadAvatarPokemonController
} = require('./images/controllers/index');

const checkParams = buildCheckFunction(['params']);

const router = Router();

router.post('/user/:id/avatar',
  [
    authValidator(['user', 'admin']),
    checkParams('id').exists(),
    uploadsMiddleware,
    requestValidator
  ],
uploadAvatarUserController);

router.post('/pokemon/:id/avatar',
  [
    authValidator(['user', 'admin']),
    checkParams('id').exists(),
    uploadsMiddleware,
    requestValidator
  ],
uploadAvatarPokemonController);

module.exports = router;

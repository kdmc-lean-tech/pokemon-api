const { Router } = require('express');
const { buildCheckFunction } = require('express-validator');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { requestValidator } = require('.././../middlewares/validators/request-validators');
const { getMessagesController, getMessageController } = require('./controllers/index');
const { Role } = require('../../utils/constants/roles.constants');

const checkParams = buildCheckFunction(['params']);
const router = Router();

router.get('/:of',
  [
    authValidator([Role.User, Role.Admin]),
    checkParams('of').exists(),
    requestValidator
  ],
getMessagesController);

router.get('/message/:id',
  [
    authValidator([Role.User, Role.Admin]),
    checkParams('id').exists(),
    requestValidator
  ],
 getMessageController);

module.exports = router;

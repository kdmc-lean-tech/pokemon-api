const { Router } = require('express');
const { buildCheckFunction } = require('express-validator');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { requestValidator } = require('.././../middlewares/validators/request-validators');
const { getMessagesController } = require('./controllers/index');

const checkParams = buildCheckFunction(['params']);
const router = Router();

router.get('/:of',
  [
    authValidator(['user', 'admin']),
    checkParams('of').exists(),
    requestValidator
  ],
getMessagesController);

module.exports = router;

const { Router } = require('express');
const { body } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { registerController, loginController } = require('./controllers/index');

const router = Router();

router.post('/register',
  [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    body('password').isStrongPassword(),
    requestValidator
  ],
registerController);

router.post('/login',
  [
    body('email').isEmail(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    body('password').isStrongPassword(),
    requestValidator
  ],
loginController);

module.exports = router;

const { Router } = require('express');
const { body, header } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { 
  registerController,
  loginController,
  activateRegisteredUserController,
  forgotPasswordController,
  changePasswordController
} = require('./controllers/index');

const router = Router();

router.post('/register',
  [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    requestValidator
  ],
registerController);

router.post('/login',
  [
    body('email').isEmail(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    requestValidator
  ],
loginController);

router.get('/activate',
  [
    header('token').exists(),
    requestValidator
  ],
activateRegisteredUserController);

router.post('/forgot-password',
  [
    body('email').not().isEmpty(),
    body('email').isEmail(),
    requestValidator
  ],
forgotPasswordController);

router.post('/change-password',
  [
    header('password').exists(),
    body('email').not().isEmpty(),
    body('email').isEmail(),
    requestValidator
  ],
changePasswordController);

module.exports = router;

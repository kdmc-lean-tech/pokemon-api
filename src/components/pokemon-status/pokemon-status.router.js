const { Router } = require('express');
const { body, buildCheckFunction } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const {
  createPokemonStatusController,
  getAllPokemonStatusController,
  getPokemonStatusController
} = require('./controllers/index');
const { Role } = require('../../utils/constants/roles.constants');

const checkParams = buildCheckFunction(['params']);
const router = Router();

router.get('/',
  [
    authValidator([Role.Admin, Role.User]),
    requestValidator
  ],
getAllPokemonStatusController);

router.get('/:id',
  [
    authValidator([Role.Admin, Role.User]),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonStatusController);

router.post('/',
  [
    authValidator([Role.Admin, Role.User]),
    body('name').notEmpty(),
    requestValidator
  ],
createPokemonStatusController);

module.exports = router;

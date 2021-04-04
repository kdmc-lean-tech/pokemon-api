const { Router } = require('express');
const { body, buildCheckFunction } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const {
  createPokemonStatusController,
  getAllPokemonStatusController,
  getPokemonStatusController
} = require('./controllers/index');

const checkParams = buildCheckFunction(['params']);
const router = Router();

router.get('/',
  [
    authValidator(['admin', 'user']),
    requestValidator
  ],
getAllPokemonStatusController);

router.get('/:id',
  [
    authValidator(['admin', 'user']),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonStatusController);

router.post('/',
  [
    authValidator(['admin', 'user']),
    body('name').notEmpty(),
    requestValidator
  ],
createPokemonStatusController);

module.exports = router;

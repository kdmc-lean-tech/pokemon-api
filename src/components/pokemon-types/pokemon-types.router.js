const { body, buildCheckFunction } = require('express-validator');
const { Router } = require('express');
const {
  createPokemonTypesController,
  getAllPokemonTypesController,
  updatePokemonTypeController,
  activePokemonController,
  getPokemonTypeController
} = require('./controllers/index');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');

const checkQueries = buildCheckFunction(['query']);
const checkParams = buildCheckFunction(['params']);

const router = Router();

router.post('/',
  [
    authValidator(['admin']),
    body('pokemonTypes').isArray({ min: 1 }),
    requestValidator
  ],
createPokemonTypesController);

router.get('/',
  [
    authValidator(['user', 'admin']),
    requestValidator
  ],
getAllPokemonTypesController);

router.put('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    requestValidator
  ],
updatePokemonTypeController);

router.patch('/:id/active',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    body('active').isBoolean(),
    requestValidator
  ],
activePokemonController);

router.get('/:id',
  [ 
    authValidator(['user', 'admin']),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonTypeController)

module.exports = router;

const { Router } = require('express');
const { body, buildCheckFunction } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const {
  activePokemonAbilityController,
  createPokemonAbilitiesController,
  updatePokemonAbilityController,
  getAllPokemonAbilitiesController,
  getPokemonAbilityController,
  searchPokemonAbilitiesController,
  getPokemonAbilitiesController
} = require('./controllers/index');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);
const router = Router();

router.post('/',
  [
    authValidator(['admin']),
    body('pokemonAbilities').isArray({ min: 1 }),
    requestValidator
  ],
createPokemonAbilitiesController);

router.get('/',
  [
    authValidator(['user', 'admin']),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getPokemonAbilitiesController);

router.put('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    requestValidator
  ],
updatePokemonAbilityController);

router.patch('/:id/active',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    body('active').isBoolean(),
    requestValidator
  ],
activePokemonAbilityController);

router.get('/:id',
  [ 
    authValidator(['user', 'admin']),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonAbilityController);

router.get('/all/abilities',
  [
    authValidator(['user', 'admin']),
    requestValidator
  ],
getAllPokemonAbilitiesController);

router.get('/search/:search',
  [
    authValidator(['user', 'admin']),
    checkQueries('search').exists(),
    requestValidator
  ],
searchPokemonAbilitiesController);

module.exports = router;

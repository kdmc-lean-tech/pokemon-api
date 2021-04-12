const { Router } = require('express');
const {
  createPokemonController,
  getPokemonController,
  getAllPokemonsController,
  updatePokemonController,
  activePokemonController,
  searchPokemonsController
} = require('./controllers/index');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { body, buildCheckFunction } = require('express-validator');
const { Role } = require('../../utils/constants/roles.constants');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);
const router = Router();

router.post('/',
  [
    authValidator([Role.User, Role.Admin]),
    body('name').not().isEmpty(),
    body('isLegendary').not().isEmpty(),
    body('generation').not().isEmpty(),
    body('weight').not().isEmpty(),
    body('types').isArray({ min: 1 }),
    body('pokedexNumber').not().isEmpty(),
    body('height').not().isEmpty(),
    body('abilities').isArray({ min: 1 }),
    body('pokemonStatistics').not().isEmpty(),
    body('description').not().isEmpty(),
    requestValidator
  ],
createPokemonController);

router.get('/:id',
  [
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonController);

router.get('/',
  [
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getAllPokemonsController);

router.put('/:id',
  [
    authValidator([Role.Admin]),
    body('name').not().isEmpty(),
    body('isLegendary').not().isEmpty(),
    body('generation').not().isEmpty(),
    body('weight').not().isEmpty(),
    body('types').isArray({ min: 1 }),
    body('pokedexNumber').not().isEmpty(),
    body('height').not().isEmpty(),
    body('abilities').isArray({ min: 1 }),
    body('pokemonStatistics').not().isEmpty(),
    body('description').not().isEmpty(),
    requestValidator
  ],
updatePokemonController);

router.patch('/:id/active',
  [
    authValidator([Role.Admin]),
    body('active').not().isEmpty(),
    requestValidator
  ],
activePokemonController);

router.get('/search/pokemons',
  [
    authValidator([Role.Admin, Role.User]),
    checkQueries('search').exists(),
    requestValidator
  ],
searchPokemonsController);

module.exports = router;

const { Router } = require('express');
const {
  createPokemonController,
  getPokemonController,
  getAllPokemonsController,
  updatePokemonController,
  activePokemonController
} = require('./controllers/index');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { body, buildCheckFunction } = require('express-validator');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);
const router = Router();

router.post('/',
  [
    authValidator(['user', 'admin']),
    body('name').not().isEmpty(),
    body('isLegendary').not().isEmpty(),
    body('generation').not().isEmpty(),
    body('weight').not().isEmpty(),
    body('types').isArray({ min: 1 }),
    body('pokedexNumber').not().isEmpty(),
    body('japaneseName').not().isEmpty(),
    body('height').not().isEmpty(),
    body('abilities').isArray({ min: 1 }),
    body('pokemonStatistics').not().isEmpty(),
    requestValidator
  ],
createPokemonController);

router.get('/:id',
  [
    authValidator(['user', 'admin']),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonController);

router.get('/',
  [
    authValidator(['user', 'admin']),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getAllPokemonsController);

router.put('/:id',
  [
    authValidator(['admin']),
    body('name').not().isEmpty(),
    body('isLegendary').not().isEmpty(),
    body('generation').not().isEmpty(),
    body('weight').not().isEmpty(),
    body('types').isArray({ min: 1 }),
    body('pokedexNumber').not().isEmpty(),
    body('japaneseName').not().isEmpty(),
    body('height').not().isEmpty(),
    body('abilities').isArray({ min: 1 }),
    body('pokemonStatistics').not().isEmpty(),
    requestValidator
  ],
updatePokemonController);

router.patch('/:id/active',
  [
    authValidator(['admin']),
    body('active').not().isEmpty(),
    requestValidator
  ],
activePokemonController)

module.exports = router;

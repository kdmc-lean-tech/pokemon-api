const { body, buildCheckFunction } = require('express-validator');
const { Router } = require('express');
const {
  createPokemonTypesController,
  getAllPokemonTypesController,
  updatePokemonTypeController,
  activePokemonController,
  getPokemonTypeController,
  searchPokemonTypesController,
  getPokemonTypesController
} = require('./controllers/index');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { Role } = require('../../utils/constants/roles.constants');

const checkQueries = buildCheckFunction(['query']);
const checkParams = buildCheckFunction(['params']);

const router = Router();

router.post('/',
  [
    authValidator([Role.Admin]),
    body('pokemonTypes').isArray({ min: 1 }),
    requestValidator
  ],
createPokemonTypesController);

router.get('/all/types',
  [
    authValidator([Role.User, Role.Admin]),
    requestValidator
  ],
getAllPokemonTypesController);

router.put('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    requestValidator
  ],
updatePokemonTypeController);

router.patch('/:id/active',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    body('active').isBoolean(),
    requestValidator
  ],
activePokemonController);

router.get('/:id',
  [ 
    authValidator([Role.User, Role.Admin]),
    checkParams('id').exists(),
    requestValidator
  ],
getPokemonTypeController);

router.get('/search/:search',
  [
    authValidator([Role.User, Role.Admin]),
    checkParams('search').exists(),
    requestValidator
  ],
searchPokemonTypesController);

router.get('/',
  [
    authValidator([Role.User, Role.Admin]),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getPokemonTypesController);

module.exports = router;

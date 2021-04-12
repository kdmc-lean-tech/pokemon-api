const { Router } = require('express');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { body, buildCheckFunction } = require('express-validator');
const {
  getPokemonCategoriesController,
  getAllPokemonCategoriesController,
  searchPokemonCategoriesController,
  getPokemonCategoryController,
  updatePokemonCategoryController,
  createPokemonCategoriesController,
  activePokemonCategoryController
} = require('./controllers/index');
const { Role } = require('../../utils/constants/roles.constants');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);

const router = Router();

router.post('/',
  [
    authValidator([Role.Admin]),
    body('pokemonCategories').isArray({ min: 1 }),
    requestValidator
  ],
createPokemonCategoriesController);

router.put('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    authValidator
  ],
updatePokemonCategoryController);

router.get('/:id',
  [
    authValidator([Role.Admin, Role.User]),
    checkParams('id').exists(),
    authValidator
  ],
getPokemonCategoryController);

router.patch('/:id/active',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    body('active').isBoolean(),
    requestValidator
  ],
activePokemonCategoryController);

router.get('/',
  [
    authValidator([Role.Admin, Role.User]),
    requestValidator
  ],
getPokemonCategoriesController);


router.get('/all/categories',
  [
    authValidator([Role.Admin, Role.User]),
    requestValidator
  ],
getAllPokemonCategoriesController);

router.get('/search/:search',
  [
    authValidator([Role.Admin]),
    checkQueries('search').exists(),
    requestValidator
  ],
searchPokemonCategoriesController);


module.exports = router;

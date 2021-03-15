const { Router } = require('express');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { body, buildCheckFunction } = require('express-validator');
const {
  getPokemonCategoriesController,
  getPokemonCategoryController,
  updatePokemonCategoryController,
  createPokemonCategoriesController,
  activePokemonCategoryController
} = require('./controllers/index');

const checkParams = buildCheckFunction(['params']);

const router = Router();

router.post('/',
  [
    authValidator(['admin']),
    body('pokemonCategories').isArray({ min: 1 }),
    requestValidator
  ],
createPokemonCategoriesController);

router.put('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    authValidator
  ],
updatePokemonCategoryController);

router.get('/:id',
  [
    authValidator(['admin', 'user']),
    checkParams('id').exists(),
    authValidator
  ],
getPokemonCategoryController);

router.patch('/:id/active',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    body('active').isBoolean(),
    requestValidator
  ],
activePokemonCategoryController);

router.get('/',
  [
    authValidator(['admin', 'user']),
    requestValidator
  ],
getPokemonCategoriesController);

module.exports = router;

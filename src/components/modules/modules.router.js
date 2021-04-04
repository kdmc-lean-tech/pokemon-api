const { Router } = require('express');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { body, buildCheckFunction } = require('express-validator');
const {
  createModuleController,
  getModuleController,
  getModulesController,
  getAllModulesController,
  searchModuleController,
  updateModuleController
} = require('./controllers/index');

const router = Router();
const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);

router.post('/',
  [
    authValidator(['admin']),
    body('name').notEmpty(),
    body('path').notEmpty(),
    body('icon').notEmpty(),
    body('label').notEmpty(),
    requestValidator
  ],
createModuleController);

router.get('/:id',
  [
    authValidator(['auth']),
    checkParams('id').exists(),
    requestValidator
  ],
getModuleController);

router.get('/',
  [
    authValidator(['auth']),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getModulesController);

router.get('/all/modules',
  [
    authValidator(['admin']),
    requestValidator
  ],
getAllModulesController);

router.get('/search/:search',
  [
    authValidator(['admin']),
    checkQueries('search').exists(),
    requestValidator
  ],
searchModuleController);

router.put('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('name').notEmpty(),
    body('path').notEmpty(),
    body('icon').notEmpty(),
    body('label').notEmpty(),
    requestValidator
  ],
updateModuleController);

module.exports = router;

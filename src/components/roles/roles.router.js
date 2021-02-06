const { Router } = require('express');
const { buildCheckFunction, body } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const {
  createRoleController,
  getAllRolesController,
  getRoleController,
  activeRoleController,
  updateRoleController
} = require('./controllers/index');
const { authValidator } = require('../../middlewares/validators/user-validator');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);
const router = Router();

router.post('/',
  [
    authValidator(['admin']),
    body('name').not().isEmpty(),
    requestValidator
  ],
createRoleController);

router.get('/',
  [
    authValidator(['admin']),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getAllRolesController);

router.get('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    requestValidator
  ],
getRoleController);

router.patch('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    requestValidator
  ],
activeRoleController);

router.put('/:id',
  [
    authValidator(['admin']),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    requestValidator
  ],
updateRoleController);

module.exports = router;

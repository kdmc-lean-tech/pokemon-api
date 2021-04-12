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
const { Role } = require('../../utils/constants/roles.constants');

const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);
const router = Router();

router.post('/',
  [
    authValidator([Role.Admin]),
    body('name').not().isEmpty(),
    body('modules').isArray({ min: 1 }),
    requestValidator
  ],
createRoleController);

router.get('/',
  [
    authValidator([Role.Admin]),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getAllRolesController);

router.get('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    requestValidator
  ],
getRoleController);

router.patch('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('active').not().isEmpty(),
    requestValidator
  ],
activeRoleController);

router.put('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('name').not().isEmpty(),
    body('modules').isArray({ min: 1 }),
    requestValidator
  ],
updateRoleController);

module.exports = router;

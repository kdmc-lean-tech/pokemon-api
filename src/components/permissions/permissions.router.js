const { Router } = require('express');
const {
  createPermissionController,
  updatePermissionController,
  getPermissionController,
  getPermissionsController,
  getAllPermissionsController,
  searchPermissionsController
} = require('./controllers/index');
const { body, buildCheckFunction } = require('express-validator');
const { requestValidator } = require('../../middlewares/validators/request-validators');
const { authValidator } = require('../../middlewares/validators/user-validator');
const { Role } = require('../../utils/constants/roles.constants');

const router = Router();
const checkParams = buildCheckFunction(['params']);
const checkQueries = buildCheckFunction(['query']);

router.post('/',
  [
    authValidator([Role.Admin]),
    body('name').notEmpty(),
    body('codename').notEmpty(),
    requestValidator
  ],
createPermissionController);

router.get('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    requestValidator
  ],
getPermissionController);

router.get('/',
  [
    authValidator([Role.Admin]),
    checkQueries('page').not().isEmpty(),
    checkQueries('itemPerPage').not().isEmpty(),
    checkQueries('sort').not().isEmpty(),
    checkQueries('search').exists(),
    requestValidator
  ],
getPermissionsController);

router.get('/all/permissions',
  [
    authValidator([Role.Admin]),
    requestValidator
  ],
getAllPermissionsController);

router.get('/search/:search',
  [
    authValidator([Role.Admin]),
    checkQueries('search').exists(),
    requestValidator
  ],
searchPermissionsController);

router.put('/:id',
  [
    authValidator([Role.Admin]),
    checkParams('id').exists(),
    body('name').notEmpty(),
    body('codename').notEmpty(),
    requestValidator
  ],
updatePermissionController);

module.exports = router;

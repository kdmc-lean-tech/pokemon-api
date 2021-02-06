const { createRoleController } = require('../controllers/create-role/create-role.controller');
const { getAllRolesController } = require('../controllers/get-all-roles/get-all-roles.controller');
const { getRoleController } = require('../controllers/get-role/get-role.controller');
const { updateRoleController } = require('../controllers/update-role/update-role.controller');
const { activeRoleController } = require('../controllers/active-role/active-role.controller');

module.exports = {
  createRoleController,
  getAllRolesController,
  getRoleController,
  updateRoleController,
  activeRoleController
}

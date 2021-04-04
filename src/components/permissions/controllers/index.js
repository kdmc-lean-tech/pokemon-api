const {
  createPermissionController
} = require('./create-permission/create-permission.controller');
const {
  getAllPermissionsController
} = require('./get-all-permissions/get-all-permissions.controller');
const {
  getPermissionController
} = require('./get-permission/get-permission.controller');
const {
  getPermissionsController
} = require('./get-permissions/get-permissions.controller');
const {
  searchPermissionsController
} = require('./search-permissions/search-permissions.controller');
const {
  updatePermissionController
} = require('./update-permission/update-permission.controller');

module.exports = {
  createPermissionController,
  getAllPermissionsController,
  getPermissionController,
  getPermissionsController,
  searchPermissionsController,
  updatePermissionController
}

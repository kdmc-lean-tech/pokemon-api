const {
  createModuleController
} = require('./create-module/create-module.controller');

const {
  getModuleController
} = require('./get-module/get-module.controller');

const {
  getAllModulesController
} = require('./get-all-modules/get-all-modules.controller');

const {
  getModulesController
} = require('./get-modules/get-modules.controller');

const {
  searchModuleController
} = require('./search-module/search-module.controller');

const {
  updateModuleController
} = require('./update-module/update-module.controller');

module.exports = {
  createModuleController,
  getModuleController,
  getAllModulesController,
  getModulesController,
  searchModuleController,
  updateModuleController
}

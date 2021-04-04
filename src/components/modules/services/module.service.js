const { Types } = require('mongoose');
const Module = require('../models/module.model');

const createModule = async (module) => {
  return await Module.create(module);
}

const getModule = async (moduleId) => {
  return await Module.findOne({
    _id: Types.ObjectId(moduleId)
  });
}

const getModules = async (paginator) => {
  return await Module.find({
    name: { $regex: paginator.search, $options: 'i' } 
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .exec();
}

const getCountModules = async (paginator) => {
  return await Module.find({
    name: { $regex: paginator.search, $options: 'i' } 
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .countDocuments();
}

const searchModules = async (search) => {
  return await Module.find({
    name: { $regex: search, $options: 'i' }
  })
    .limit(10);
}

const getAllModules = async () => {
  return await Module.find();
}

const updateModule = async (moduleId, module) => {
  return await Module.updateOne(
    { _id: Types.ObjectId(moduleId) },
    { $set: module }
  );
}

const activeModule = async (moduleId, active) => {
  return await Module.updateOne(
    { _id: Types.ObjectId(moduleId) },
    { $set: { active } }
  );
}

module.exports = {
  createModule,
  getModule,
  getModules,
  searchModules,
  getAllModules,
  updateModule,
  activeModule,
  getCountModules
}

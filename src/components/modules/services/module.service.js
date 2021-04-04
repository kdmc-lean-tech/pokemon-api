const { Types } = require('mongoose');
const Module = require('../models/module.model');

const createModule = async (module) => {
  return await Module.create(module);
}

const getModule = async (moduleId) => {
  return await Module.aggregate([
    { _id: Types.ObjectId(moduleId) }
  ]).then(response => response[0]);
}

const getModules = async (paginator) => {
  return await Module.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
  ]);
}

const getCountModules = async (paginator) => {
  return await Module.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) },
    { $count: 'name' }
  ]).then(response => response[0] ? response[0].name : 0);
}

const searchModules = async (search) => {
  return await Module.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]);
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

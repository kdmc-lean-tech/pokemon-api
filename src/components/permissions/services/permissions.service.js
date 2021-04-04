const Permission = require('../models/permissions.model');
const { Types } = require('mongoose');

const createPermission = async (permission) => {
  return await Permission.create(permission);
}

const getPermission = async (permissionId) => {
  return await Permission.aggregate([
    { _id: Types.ObjectId(permissionId) }
  ]).then(response => response[0]);
}

const getPermissions = async (paginator) => {
  return await Permission.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
  ]);
}

const getCountPermissions = async (paginator) => {
  return await Permission.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) },
    { $count: 'name' }
  ]).then(response => response[0] ? response[0].name : 0);
}

const searchPermissions = async (search) => {
  return await Permission.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]);
}

const getAllPermissions = async () => {
  return await Permission.find();
}

const updatePermission = async (permissionId, permission) => {
  return await Permission.updateOne(
    { _id: Types.ObjectId(permissionId) },
    { $set: permission }
  );
}

const activePermission = async (permissionId, active) => {
  return await Permission.updateOne(
    { _id: Types.ObjectId(permissionId) },
    { $set: { active } }
  );
}

module.exports = {
  createPermission,
  getPermission,
  getPermissions,
  searchPermissions,
  getAllPermissions,
  updatePermission,
  activePermission,
  getCountPermissions
}

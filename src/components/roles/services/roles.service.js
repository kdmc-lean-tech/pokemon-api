const Role = require('../models/roles.model');
const { Types } = require('mongoose');
const { moduleLookup } = require('./lookup/roles.lookup');

const createRole = async(role) => {
  return await Role.create(role);
}

const getAllRoles = async(paginator) => {
  return Role.aggregate([
    { $match: { name: { $regex: paginator.search } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
  ]);
}

const getRole = async(roleId) => {
  return await Role.aggregate([
    { $lookup: moduleLookup },
    { $match: { _id: Types.ObjectId(roleId) } },
  ]).then(response => response[0]);
}

const updateRole = async(roleId, role) => {
  return await Role.updateOne(
    { _id: Types.ObjectId(roleId) },
    { $set: role }
  );
}

const activeRole = async (roleId, status) => {
  const { active } = status;
  return await Role.updateOne(
    { _id: Types.ObjectId(roleId) },
    { $set: { active } },
    { lean: true, new: true }
  );
}

const getRoleByName = async (roleName) => {
  return await Role.aggregate([
    { $match:
      { name: { $eq: roleName } }
    },
    { $lookup: moduleLookup }
  ]).then(response => response[0]);
}

const getCountRoles = async () => {
  return await Role.aggregate([
    { $match: { name: { $regex: paginator.search } } },
    { $count: 'name' }
  ]).then(response => response[0] ? response[0].name : 0);
}

module.exports = {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  activeRole,
  getRoleByName,
  getCountRoles
}

const Role = require('../models/roles.model');
const { Types } = require('mongoose');

const createRole = async(role) => {
  return await Role.create(role);
}

const getAllRoles = async(paginator) => {
  return Role.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .exec();
}

const getRole = async(roleId) => {
  return await Role.findOne({
    _id: Types.ObjectId(roleId)
  })
    .populate('modules');
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
    { $set: { active } }
  );
}

const getRoleByName = async (roleName) => {
  return await Role.findOne({
    name: roleName
  })
    .populate('modules');
}

const getCountRoles = async (paginator) => {
  return await Role.find({
    name: { $regex: paginator.search ? paginator.search : '', $options: 'i' }
  }).countDocuments();
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

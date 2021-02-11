const Role = require('../models/roles.model');
const { Types } = require('mongoose');

const createRole = async(role) => {
  role.name = role.name.toLowerCase();
  const newRole = new Role(role);
  await newRole.save();
  return newRole;
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
  return await Role.findOne({ _id: roleId });
}

const updateRole = async(roleId, role) => {
  const { name } = role;
  return await Role.updateOne(
    { _id: Types.ObjectId(roleId) },
    { $set: { name } },
    { lean: true, new: true }
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
  return await Role.findOne(
    { name: roleName }
  );
}

const getCountRoles = async () => {
  return await Role.find({}).countDocuments();
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

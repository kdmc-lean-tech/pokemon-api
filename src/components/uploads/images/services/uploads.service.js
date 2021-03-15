const Image = require('../models/image.model');
const { Types } = require('mongoose');
const { S3_URL, s3Bucket } = require('../../../../config/aws.config');

const getRandomKeyS3Resource = (type, fileExtension) => {
  const currentTime = new Date().getTime();
  return `${type}/${Types.ObjectId()}-${currentTime}.${fileExtension}`;
}

const uploadS3Resource = (file, path, acl) => {
  const data = {
    Key: path,
    Body: file.data,
    ContentEncoding: file.encoding,
    ContentType: file.mimetype,
    ACL: acl
  }
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(`${S3_URL}/${path}`);
    });
  });
}

const removeS3Resource = (path) => {
  const params = {
    Key: path
  }
  return new Promise((resolve, reject) => {
    s3Bucket.deleteObject(params, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const removeImageAndS3Resource = async (image) => {
  try {
    if (!image) return;
    await removeImage(image._id);
    await removeS3Resource(image.key);
  } catch (error) {
    throw new Error(error);
  }
}

const uploadImage = async (image) => {
  return await Image.create(image);
}

const removeImage = async (imageId) => {
  return await Image.deleteOne(
    { _id: Types.ObjectId(imageId) }
  );
}

const getImage = async (imageId) => {
  return await Image.findOne({
    _id: Types.ObjectId(imageId)
  });
}

module.exports = {
  getRandomKeyS3Resource,
  uploadS3Resource,
  removeS3Resource,
  uploadImage,
  removeImage,
  removeImageAndS3Resource,
  getImage
}

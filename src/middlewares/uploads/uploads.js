const {
  validateImageExtension
} = require('../../utils/upload-validators/upload-images-validators');
const {
  clientError
} = require('../../utils/result-response/result-response.utils');
const {
  getRandomKeyS3Resource,
  uploadS3Resource,
  uploadImage,
  removeS3Resource
} = require('../../components/uploads/images/services/uploads.service');

const uploadsMiddleware = async (req, res, next) => {
  const image = req.files.image;
  let isUploaded = false;

  if (!image || !validateImageExtension(image.mimetype)) {
    return clientError(res, 'You must add a (png, jpg, jpeg) image');
  }

  const extension = image.name.split('.').pop();
  const path = getRandomKeyS3Resource('image', extension);

  try {
    const result = await uploadS3Resource(image, path, 'public-read');
    isUploaded = true;
    req.image = await saveImage(result, path, image);
    next();
  } catch (error) {
    console.log(error);
    await removeS3ImageOnError(isUploaded, path);
    return internalServerError(res, error);
  }
}

const saveImage = async (url, path, image) => {
  const imageFormat = {
    url,
    key: path,
    size: image.size,
    contentType: image.mimetype
  }
  return await uploadImage(imageFormat);
}

const removeS3ImageOnError = async (isUploaded, path) => {
  try {
    if (isUploaded) {
      await removeS3Resource(path);
    }
  } catch (error) {
    return;
  }
}

module.exports = {
  uploadsMiddleware
}

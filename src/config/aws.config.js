const AWS = require('aws-sdk');
const { keys } = require('./keys.config');

AWS.config.update({
  accessKeyId: keys.get('AWS_ACCESS_KEY_ID'),
  secretAccessKey: keys.get('AWS_SECRET_ACCESS_KEY'),
  region: 'us-east-2'
});

const S3_URL = `https://s3.us-east-2.amazonaws.com/poke-images`;

const s3Bucket = new AWS.S3({ params: { Bucket: 'poke-images' } });

module.exports = {
  s3Bucket,
  S3_URL
}


const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../utils/cloudinary');

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'your_cloud_name',
//   api_key: 'your_api_key',
//   api_secret: 'your_api_secret'
// });

// Set up multer storage using Cloudinary


// Set up multer middleware for file upload using Cloudinary storage
const fileUpload = multer();

module.exports = fileUpload;

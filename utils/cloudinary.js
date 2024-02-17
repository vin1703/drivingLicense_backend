const  cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dxhyjkbgx', 
  api_key: '524182662221737', 
  api_secret: '5tj8Tj7WxLA999P86b0oC2J1TbQ' 
});

module.exports = cloudinary;
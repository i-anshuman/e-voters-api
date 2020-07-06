const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME
});

const upload = file => {
  const options = {
    tags: process.env.TAGS,
    folder: process.env.FOLDER
  };
  return cloudinary.uploader.upload(file, options);
}

module.exports = upload;

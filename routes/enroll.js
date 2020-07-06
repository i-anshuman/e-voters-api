const express = require('express');
const enroll  = require('../controllers/enroll');
const upload  = require('../controllers/upload');
const { verifyEnrollmentData } = require('../middlewares/enroll');
const router  = express.Router();

router.post('/', verifyEnrollmentData, async (req, res) => {
  const voterInfo = req.body;
  upload(voterInfo.image)
    .then(image => {
      voterInfo.photo = image.secure_url;
      delete voterInfo.image;
      enroll(voterInfo)
        .then(voter => res.json({ voterID: voter._id, enrolledOn: voter.enrolledOn }))
        .catch(error => res.json({ type: 'Enrollment Error', error }));
    })
    .catch(error => res.json({ type: 'Upload Error', error }));
});

module.exports = router;

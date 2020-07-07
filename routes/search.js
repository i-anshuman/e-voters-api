const express = require('express');
const router  = express.Router();
const search  = require('../controllers/search');
const verifySearchData = require('../middlewares/search');

router.get('/', verifySearchData, (req, res) => {
  search(req.query)
    .then(voters => res.json({ voters }))
    .catch(error => res.json({ error }));
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const statistics = require('../controllers/statistics');

router.get('/', (req, res) => {
  statistics('current')
    .then(result => res.json({ result  }))
    .catch(error => res.json({ error }));
});

module.exports = router;

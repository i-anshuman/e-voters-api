const express  = require('express');
const router   = express.Router();
const ejs      = require('ejs');
const pdf      = require('html-pdf');
const Voter    = require('../models/voter');
const ObjectId = require('mongoose').Types.ObjectId;
const search   = require('../controllers/search');
const verifySearchData = require('../middlewares/search');

router.get('/', verifySearchData, (req, res) => {
  search({ _id: new ObjectId(req.query.voterID) })
    .then(voter => {
      if (voter) {
        ejs.renderFile(__dirname + '/../template/voterid.ejs', voter[0], (error, html) => {
          if (error) {
            res.json({ error });
            return;
          }
          const options = {
            width: '210mm',
            height: '297mm',
            border: {
              top: '25mm',
              bottom: '25mm',
              right: '25mm',
              left: '25mm'
            }
          };
          pdf.create(html, options).toStream((error, stream) => {
            if (error) {
              res.json({ error });
              return;
            }
            stream.pipe(res);
          });
        });
      }
      else {
        res.json({ error: "Voter not found." });
      }
    })
    .catch(error => res.json({ error }));
});

module.exports = router;

const { isVoterID, isName } = require('../utils/verification');

const verifySearchData = (req, res, next) => {
  const queries = { ...req.query };
  const errors  = {};
  for (const query in queries) {
    switch (query) {
      case 'voterID':
        if (!isVoterID(queries[query])) {
          errors.voterID = "Invalid voter id.";
        }
        break;
      case 'name':
        if (!isName(queries[query])) {
          errors.name = "Name has invalid character(s). Only alphabets and spaces are allowed.";
        }
        break;
    }
  }
  (Object.keys(errors).length === 0) ? next() : res.json({ errors });
};

module.exports = verifySearchData;

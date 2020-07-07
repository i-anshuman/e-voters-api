const Voter = require('../models/voter');

const search = keys => {
  return new Promise((resolve, reject) => {
    Voter.find(keys, (error, voter) => {
      error ? reject(error) : resolve(voter);
    });
  });
}

module.exports = search;

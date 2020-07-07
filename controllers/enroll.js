const Voter = require('../models/voter');

const enroll = voterInfo => {
  return new Promise((resolve, reject) => {
    const voter = new Voter(voterInfo);
    voter.save((error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
}

module.exports = enroll;

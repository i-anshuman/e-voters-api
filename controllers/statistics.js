const Voter = require('../models/voter');

const statistics = type => {
  return new Promise((resolve, reject) => {
    Voter.aggregate([
      { $unwind: "$address" },
      { $unwind: `$address.${type}` },
      {
        $group: {
          _id: `$address.${type}.state`,
          count: { $sum: 1 }
        }
      }
    ]).exec((error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
};

module.exports = statistics;

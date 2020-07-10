const mongoose = require('mongoose');
const Address  = require('./address');
const Schema   = mongoose.Schema;

const voter = new Schema({
  constituency: {
    type: String,
    required: [true, 'Constituency is required.']
  },
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  surname: {
    type: String,
    required: [true, 'Surname is required.']
  },
  relative: {
    type: String,
    required: [true, 'Fullname of relative is required.']
  },
  relation: {
    type: String,
    required: [true, 'Relation with relative is required.']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required.']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required.']
  },
  address: {
    current: {
      type: Address,
      required: [true, 'Current address is required.']
    },
    permanent: {
      type: Schema.Types.Mixed,
      default: "Same as current address"
    }
  },
  disability: {
    type: String,
    default: 'none'
  },
  email: String,
  mobile: String,
  photo: {
    type: String,
    required: [true, 'Photo is required.']
  },
  enrolledOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Voter', voter);

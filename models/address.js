const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const address = new Schema({
  house: {
    type: String,
    default: "No House number has been assigned."
  },
  area: {
    type: String,
    required: [true, 'Street/Area/Locality is required.']
  },
  block: {
    type: String,
    required: [true, 'Town/Village is required.']
  },
  post: {
    type: String,
    required: [true, 'Post office is required.']
  },
  pin: {
    type: String,
    required: [true, 'Postal Index Number(PIN) is required.']
  },
  district: {
    type: String,
    required: [true, 'District is required.']
  },
  state: {
    type: String,
    required: [true, 'State/Union Territory is required.']
  }
});

module.exports = address;

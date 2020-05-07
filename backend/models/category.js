const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  routerLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Category', categorySchema);

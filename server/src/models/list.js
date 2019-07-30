const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Number,
    default: new Date().valueOf(),
  },
});

module.exports = mongoose.model('List', ListSchema);

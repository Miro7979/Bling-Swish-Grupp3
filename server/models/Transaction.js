const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'UserRaw',
    required: true,
    index: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'UserRaw',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String
  }
});
// Populate to and from
transactionsSchema.pre('find', function () {
  this.populate('to from', 'name phone');
});

module.exports = mongoose.model('Transaction', transactionsSchema);
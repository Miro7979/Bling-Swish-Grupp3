const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
  date: { type: Date, default: Date.now },
  //balance: { type: Number, required: true },
  amount: { type: Number, required: true },
  fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Transaction', transactionsSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Transaction', transactionsSchema);
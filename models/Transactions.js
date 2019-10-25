const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: String, required: true },
  fromUser: { type: Schema.Types.ObjectId, ref: User, required: true },
  toUser:  { type: Schema.Types.ObjectId, ref: User, required: true },
  


});

module.exports = mongoose.model('Transaction', transactionsSchema);
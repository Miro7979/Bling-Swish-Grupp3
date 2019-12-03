const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toJSONSettings = {
  virtuals: true, // show virtuals
  transform: function (doc, ret) {
    delete ret.transactionsTo;
    delete ret.transactionsFrom;
    // set by Mongoose when virtuals true
    // (a copy of _id, so hide)
    delete ret.id
    return ret;
  }
};

let userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  nationalIdNumber: { type: Number, required: true },
  role: { type: String, default: 'visitor' },
  children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  waitingChildren:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  activated: { type: Boolean, default: false },
  limit: { type: Number }
}, {
  // settings
  toJSON: toJSONSettings,
  toObject: toJSONSettings
})


// Populate the virtual transactionsTo
userSchema.pre('find', function () {
  this.populate('transactionsTo');
});

// Setup the virtual transactionsTo

// that is populated when my id

// matches the to field in a transaction
userSchema.virtual('transactionsTo', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'to'
});
// Populate the virtual transactionsTo
userSchema.pre('find', function () {
  this.populate('transactionsTo');
});
// Setup the virtual transactionsFrom
// that is populated when my id
// matches the from field in a transaction
userSchema.virtual('transactionsFrom', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'from'
});
// Populate the virtual transactionsFrom
userSchema.pre('find', function () {
  this.populate('transactionsFrom');
});

// Create a virtual getter transactions
// that combines transactionsTo and transactionsFrom
userSchema.virtual('transactions').get(function () {
  // when its to me the amount is positive
  let to = (this.transactionsTo || []).map(
    ({ from, amount, date, message }) =>
      ({ date, from, amount, message })
  );
  // when its from me the amount is negative
  let from = (this.transactionsFrom || []).map(
    ({ to, amount, date, message }) =>
      ({ date, to, amount: -amount, message })
  );

  // combine and sort all by date (oldest first)
  let all = [...to, ...from].sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  // calc ingoing and outgoing balances
  let balance = 0;
  all.forEach(transaction => {
    transaction.ingoingBalance = balance;
    balance += transaction.amount;
    transaction.outgoingBalance = balance;
  });

  // reverse order to newest first if you want
  all.reverse();
  return all;
});

// Create a virtual getter balance
// (current balance of account)
userSchema.virtual('balance').get(function () {
  return this.transactions[0] ?
    this.transactions[0].outgoingBalance : 0
});

userSchema.methods.linkResetPassword = function testFunc(params) {
  // console.log(params)
}
userSchema.methods.linkActivate = function testFunc(params) {
  //console.log(params)
}
//   ['121212121212','12121221212

module.exports = mongoose.model('User', userSchema);
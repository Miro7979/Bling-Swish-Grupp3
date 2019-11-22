const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Transaction = require('./Transaction');

let userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  nationalIdNumber: { type: Number, required: true },
  role: { type: String, default: 'visitor' },
  children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  activated: { type: Boolean, default: false },
  limit: { type: Number }
})

let allTransactions;

userSchema.pre('find', async function(){
  allTransactions = await Transaction.find();
});

userSchema.virtual('transactions').get(() => {
  let t = allTransactions.filter(x => this._id === x.toUser || this._id === x.fromUser);
  t.sort((a, b) => a.date > b.date ? -1 : 1);
  return t;
});

userSchema.virtual('balance').get(() => {
  let t = allTransactions.filter(x => this._id === x.toUser || this._id === x.fromUser);
  let balance = 0;
  for(let transaction of t){
    let to = this._id === transaction.userTo;
    balance += (to ? 1 : -1) * transaction.amount;
  }
  return balance;
});

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.methods.linkResetPassword = function testFunc(params) {
   // console.log(params)
  }
  userSchema.methods.linkActivate = function testFunc(params) {
    //console.log(params)
  }
//   ['121212121212','12121221212

module.exports = mongoose.model('User', userSchema);
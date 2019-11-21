const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

userSchema.methods.linkResetPassword = function testFunc(params) {
  console.log(params)
}
userSchema.methods.linkActivate = function testFunc(params) {
  console.log(params)
}

module.exports = mongoose.model('User', userSchema);
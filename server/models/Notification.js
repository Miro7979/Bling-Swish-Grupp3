const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  toAll: { type: Boolean, default: false }
})

module.exports = mongoose.model('Notification', notificationSchema);
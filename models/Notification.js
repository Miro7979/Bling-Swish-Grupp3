const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
    message: {type: String,  required: true},
    seen: {type: Boolean, required: true},
    date: {type: String, required:true},
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    toAll: {type: String}
})

module.exports = mongoose.model('Notification', notificationSchema);
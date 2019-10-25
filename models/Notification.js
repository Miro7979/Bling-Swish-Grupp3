const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notificationSchema = new Schema({
    message: {type: String,  required: true},
    seen: {type: boolean, required: true},
    date: {type: string, required:true},
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    toAll: {type: string}
})

module.exports = mongoose.model('Notification', notificationSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let resetSchema = new Schema({
    date: {type: Date, default: Date.now},
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Reset', resetSchema);
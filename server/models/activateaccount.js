const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let activateaccountschema = new Schema({
    role: {type: String, default: 'visitor'},

})

module.exports = mongoose.model('Activateaccount', activateaccountschema);
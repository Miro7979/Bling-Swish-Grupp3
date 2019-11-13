const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String,  required: true},
    password: {type: String,  required: true},
    phone: {type: String,  required: true},
    email: {type: String,  required: true, unique:true},
    nationalIdNumber: { type: Number, required: true},
    role: {type: String, default: 'visitor'},
    children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    activated: {type:Boolean, default:false}
})

userSchema.methods.linkResetPassword = function testFunc(params) {
    console.log(params)
  }
  userSchema.methods.linkActivate = function testFunc(params) {
    console.log(params)
  }
//   ['121212121212','12121221212
  
  
//   zz']

//   let user1 = new user()
//   user1 = {
//       name: "hej",
//       password: "12121212",
//       children: ['121214567889']
//   }
//   user1.save()
// user.findOne({name: user1.name}).populate('children').exec()
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Why is this model needed?
// Because if we started populating
// transactions with the normal User model
// (enriched with virtuals that populate it with transactions)
// we would get an endless internal loop in mongooose
// So we changed the ref to UserRaw in the Transaction model
// and thus avoid this endless loop
// (UserRaw is not connected to REST just used for population
//  in the Transaction model)

const modelName = 'UserRaw';
const schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    nationalIdNumber: { type: Number, required: true },
    role: { type: String, default: 'visitor' },
    children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    // transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    activated: { type: Boolean, default: false },
    limit: { type: Number }
  }
);

module.exports = mongoose.model(modelName, schema, 'users');
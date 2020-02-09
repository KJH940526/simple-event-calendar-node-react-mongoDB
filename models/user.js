const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{ type: Types.ObjectId, ref: 'Event' }]
});

module.exports = model('User', userSchema);
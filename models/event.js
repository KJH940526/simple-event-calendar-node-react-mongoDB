const { Schema, model, Types } = require('mongoose');

const eventSchema = new Schema({
    start: { type: Number, required: true },
    duration: { type: Number, required: true },
    title: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Event', eventSchema);

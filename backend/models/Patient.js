const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  place: { type: String },
  consultationHistory: [{
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: Date },
    concern: { type: String },
    treated: { type: Boolean, default: false },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);

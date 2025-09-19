const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  doctorId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);

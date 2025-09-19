const Patient = require('../models/Patient');

exports.addPatient = async (req, res) => {
  try {
    const { name, gender, age, contactNumber, place, consultationHistory } = req.body;
    const patient = new Patient({ name, gender, age, contactNumber, place, consultationHistory });
    await patient.save();
    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const { query } = req.query;
    const patients = await Patient.find({ name: { $regex: query, $options: 'i' } });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

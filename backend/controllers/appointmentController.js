const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, timeSlot, concern } = req.body;
    // Prevent booking for today
    const today = new Date();
    const bookingDate = new Date(date);
    if (bookingDate.toDateString() === today.toDateString()) {
      return res.status(400).json({ message: 'Cannot book appointment for today. Book at least a day prior.' });
    }
    const appointment = new Appointment({ patient, doctor, date, timeSlot, concern });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchAppointments = async (req, res) => {
  try {
    const { query } = req.query;
    const appointments = await Appointment.find({ concern: { $regex: query, $options: 'i' } }).populate('patient doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTreatedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { treated } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, { treated }, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

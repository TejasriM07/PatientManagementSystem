const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

exports.getStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const today = new Date();
    const upcomingAppointments = await Appointment.countDocuments({
      date: { $gt: today }
    });

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      upcomingAppointments
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
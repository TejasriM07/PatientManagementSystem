const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointment, deleteAppointment, searchAppointments, updateTreatedStatus } = require('../controllers/appointmentController');

router.post('/book', bookAppointment);
router.get('/', getAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
router.get('/search', searchAppointments);
router.patch('/:id/treated', updateTreatedStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { addPatient, getPatients, updatePatient, deletePatient, searchPatients } = require('../controllers/patientController');

router.post('/add', addPatient);
router.get('/', getPatients);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/search', searchPatients);

module.exports = router;

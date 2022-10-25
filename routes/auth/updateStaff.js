const express = require('express');
const router = express.Router({ mergeParams: true });
const Staff = require('../../models/staffModel');
const auth = require('../../controllers/authController');

router.patch('/', auth, (request, response) => {

	const staffId = request.params.staffId;
	const name = request.body.name;
	const email = request.body.email;
	const contactNumber = request.body.contactNumber;
	const age = request.body.age;
	const costPerHour = request.body.costPerHour;

	Staff.findById(staffId).then((staff) => {
		return Object.assign(staff, {
			name: name,
			email: email,
			contactNumber: contactNumber,
			age: age,
			costPerHour: costPerHour
		})
	}).then((staff) => {
		return staff.save();
	}).then((updatedStaff) => {
		response.status(201).send({
			message: "Staff Updated",
			updatedStaff
		})
	}).catch((e) => {
		response.send(e);
	})
})

module.exports = router;

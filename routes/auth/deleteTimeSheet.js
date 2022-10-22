const express = require('express');
const router = express.Router({ mergeParams: true });
const Timesheet = require('../../models/timesheetModel');
const auth = require('../../controllers/authController');

router.delete('/', auth, (request, response) => {
	const timesheetId = request.params.timesheetId;

	Timesheet.findByIdAndDelete(timesheetId)
		.then((result) => {
			response.status(201).send({
				message: "Successfully deleted",
				result
			})
		})
		.catch((error) => {
			response.status(400).send({
				message: "Failed to delete",
				error
			})
		})
})

module.exports = router;

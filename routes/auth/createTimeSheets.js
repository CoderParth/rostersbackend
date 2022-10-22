const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../controllers/authController");
const TimeSheet = require("../../models/timesheetModel");
const Staff = require("../../models/staffModel");


router.post('/', auth, (request, response) => {

	const timesheet = new TimeSheet({
		startDayTime: request.body.startDayTime,
		endDayTime: request.body.endDayTime,
		staff: request.params.staffId
	})

	timesheet.save()
		.then((result) => {
			response.status(201).send({
				message: 'Timesheet successfully created for',
				result
			}
			)
		})
		.catch((error) => {
			response.status(500).send({
				message: "Failed to create timesheet",
				error
			})
		})

})

module.exports = router;

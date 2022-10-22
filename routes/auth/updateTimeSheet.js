const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../../controllers/authController');
const Timesheet = require('../../models/timesheetModel');

router.patch('/', auth, async (request, response) => {
	const timesheetId = request.params.timesheetId;
	const newStartDayTime = request.body.startDayTime;
	const newEndDayTime = request.body.endDayTime;

	await Timesheet.findById(timesheetId).then((time) => {
		return Object.assign(time, {
			startDayTime: newStartDayTime,
			endDayTime: newEndDayTime
		});
	}).then((time) => {
		return time.save();
	}).then((updatedTime) => {
		response.status(201).send(({
			message: "TImesheet updated",
			updatedTime
		}))
	}).catch((e) => {
		response.send(e);
	})
})

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const TimeSheet = require('../../models/timesheetModel');
const auth = require('../../controllers/authController');

router.get('/', auth, async (request, response) => {
	const staffId = request.params.staffId;
	const timesheets = await TimeSheet.find({ staff: staffId });
	response.send(`showing timesheets: ${timesheets}`);
})

module.exports = router;

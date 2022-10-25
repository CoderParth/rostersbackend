const express = require('express');
const router = express.Router({ mergeParams: true });
const Staff = require('../../models/staffModel');
const auth = require('../../controllers/authController');


router.delete('/', auth, (request, response) => {
	const staffId = request.params.staffId;

	Staff.findByIdAndDelete(staffId)
		.then((result) => {
			response.status(201).send({
				message: "Staff Successfully deleted",
				result
			})
		}).catch((error) => {
			response.status(400).send({
				message: "Failed to delete",
				error
			})
		})
})


module.exports = router;

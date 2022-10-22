const express = require("express");
const router = express.Router();
const auth = require("../../controllers/authController");
const Staff = require("../../models/staffModel");


router.post('/', auth, (request, response) => {
	const staff = new Staff({
		name: request.body.name,
		email: request.body.email,
		contactNumber: request.body.contactNumber,
		age: request.body.age,
		costPerHour: request.body.costPerHour,
		user: request.user.userId
	})

	staff.save()
		.then((result) => {
			response.status(201).send({
				message: "Added staff successfully",
				result
			})
		})
		.catch((error) => {
			response.status(500).send({
				message: "Failed to add staff",
				error
			})
		})

})



module.exports = router;

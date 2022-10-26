const express = require('express');
const router = express.Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config()

router.post('/', async (request, response) => {
	const userId = request.params.userId;
	const token = request.params.token;
	const newPassword = request.body.newPassword;


	//verifying the token
	const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);
	// hashing the password
	const hashedPassword = await bcrypt.hash(newPassword, 10)

	if (decodedToken) {
		User.findById(userId)
			.then((user) => {
				return Object.assign(user, {
					email: user.email,
					password: hashedPassword
				})
			}).then((user) => {
				return user.save();
			}).then((result) => {
				response.status(201).send({
					message: "Password successfully changed",
					result
				})
			}).catch((error) => {
				response.status(500).send({
					message: "Password failed to change",
					error: error
				})

			})

	} else {
		response.send("Invalid token");
	}

})

module.exports = router;

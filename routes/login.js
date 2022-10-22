const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (request, response) => {
	//CHeck if the user exists
	User.findOne({ email: request.body.email })
		.then((user) => {
			bcrypt.compare(request.body.password, user.password)
				.then((passwordCheck) => {
					if (!passwordCheck) {
						response.status(400).send({
							message: "Password does not match"
						})
					}

					//Create and sign the token
					const token = jwt.sign(
						{
							userId: user._id,
							userEmail: user.email,
						},
						"SECRET-TOKEN",
						{
							expiresIn: "24h"
						}
					)

					// Send success message
					response.status(200).send({
						message: "Successful login",
						email: user.email,
						token
					})

				})
		})
		.catch((error) => {
			response.status(404).send({
				message: "User does not exist",
				error
			})
		})





















	// Check if the email exists
	// User.findOne({ email: request.body.email })
	// 	.then((user) => {
	// 		bcrypt.compare(request.body.password, user.password)
	// 			.then((passwordCheck) => {
	// 				if (!passwordCheck) {
	// 					response.status(400).send({
	// 						message: "Password does not match"
	// 					})
	// 				}

	// 				// Create JWT token
	// 				const token = jwt.sign({
	// 					userId: user._id,
	// 					userEmail: user.email,
	// 				},
	// 					"RANDOM-TOKEN",
	// 					{ expiresIn: "24h" });

	// 				//Send success message

	// 				response.status(200).send({
	// 					message: "Successful Login",
	// 					email: user.email,
	// 					token,
	// 				})
	// 			})
	// 	})
	// 	.catch((error) => {
	// 		response.status(500).send({
	// 			message: "Something went wrong",
	// 			error
	// 		})
	// 	})

});

module.exports = router;

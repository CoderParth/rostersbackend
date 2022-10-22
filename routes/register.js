const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then((hashedPassword) => {
			const user = new User({
				email: req.body.email,
				password: hashedPassword
			});

			// Save the user
			user.save()
				.then((result) => {
					res.status(201).send({
						message: "User successfully create",
						result
					})
				})
				.catch((error) => {
					res.status(500).send({
						message: "Failed to register",
						error
					})
				}
				)
		})
		.catch((e) => {
			res.status(500).send({
				message: "Failed to register. EMail already exists",
				e
			});
		});


});

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const sgMail = require('@sendgrid/mail');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


router.post('/', (request, response) => {
	User.findOne({ email: request.body.email })
		.then((user) => {
			// create and sign token
			const token = jwt.sign({
				userEmail: user.email,
			},
				process.env.SECRET_TOKEN,
				{
					expiresIn: "1h"
				})

			const msg = {
				to: user.email,
				from: process.env.FROM_EMAIL,
				subject: 'Password Reset for manageroster',
				html: `<body>
				<p> Hi ${user.email}!
				<br> Please POST on the following link and set the key as "newPassword" while using POST method to reset your password.
				http://localhost:3000/changePassword/${user._id}/${token}
				<br> If you did not perform this request please ignore this email.
				</p>
				</body>`
			}

			sgMail
				.send(msg)
				.then(() => {
					console.log('Email sent')
					response.status(200).send({
						message: "EMAIL SUCCESSFULLY SENT",
						email: user.email,
						token
					});
				})
				.catch((error) => {
					console.error(error)
				})

		})
		.catch((error) => {
			response.status(404).send({
				message: "Please recheck your credentials and try again",
				error
			})
		})
})

module.exports = router;

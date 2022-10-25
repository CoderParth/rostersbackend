const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = async (request, response, next) => {
	try {
		// retrieve the token
		const token = await request.headers.authorization.split(" ")[1];

		//compare the token
		const decodedToken = await jwt.verify(
			token,
			SECRET_TOKEN
		)

		// retrieve the details of the user
		const user = await decodedToken;

		// pass the user to the endpoint
		request.user = user;

		// pass it down to the next functionality
		next()

	}
	catch (error) {
		response.status(401).send({
			error: new Error("Invalid request")
		})
	}
}

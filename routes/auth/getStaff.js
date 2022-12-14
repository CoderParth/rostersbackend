const express = require('express');
const router = express.Router();
const auth = require('../../controllers/authController');
const User = require("../../models/userModel");
const Staff = require("../../models/staffModel");


router.get('/', auth, async (request, response,) => {
	const staffs = await Staff.find({ user: request.user.userId });
	response.send(`${request.user.userEmail}
		Here is a list of your staffs: ${staffs}`);
});


module.exports = router;

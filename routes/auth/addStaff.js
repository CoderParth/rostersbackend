const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const Aws = require('aws-sdk');
const auth = require("../../controllers/authController");
const Staff = require("../../models/staffModel");
require('dotenv').config()

// For defining the storage destination
const storage = multer.memoryStorage({
	destination: function (req, file, cb) {
		cb(null, '')
	}
})

// checking the file type
const filefilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

//  creating the S3 instance
const s3 = new Aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
	bucket: process.env.AWS_BUCKET_NAME,
	signatureVersion: 'v4'
})


router.post('/', auth, upload.single('userImage'), (request, response) => {
	console.log(request.file);
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: request.file.originalname,
		Body: request.file.buffer,
		ContentType: "image/jpeg"
	};

	console.log(params);

	s3.upload(params, (error, data) => {
		if (error) {
			response.status(500).send({ "err": error })
		}
		console.log(data);
		//saving the information in the database.
		const staff = new Staff({
			name: request.body.name,
			email: request.body.email,
			contactNumber: request.body.contactNumber,
			age: request.body.age,
			costPerHour: request.body.costPerHour,
			userImage: data.Location,
			user: request.user.userId,
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
					error: error
				})
			})
	})

})

module.exports = router;

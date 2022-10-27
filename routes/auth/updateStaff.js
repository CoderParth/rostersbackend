const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const Aws = require('aws-sdk');
const Staff = require('../../models/staffModel');
const auth = require('../../controllers/authController');
require('dotenv').config()

// FOR storage destination of the file
const storage = multer.memoryStorage({
	destination: function (req, file, cb) {
		cb(null, '')
	}
})

// Checking the file type
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

// defining upload variable
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Creating the s3 instance
const s3 = new Aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
	bucket: process.env.AWS_BUCKET_NAME,
	signatureVersion: 'v4'
})

router.patch('/', auth, upload.single('userImage'), (request, response) => {

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: request.file.originalname,
		Body: request.file.buffer,
		ContentType: "image/jpeg"
	};

	s3.upload(params, (error, data) => {
		if (error) {
			response.status(500).send({ "err": error })
		}

		console.log(data);

		const staffId = request.params.staffId;
		const name = request.body.name;
		const email = request.body.email;
		const contactNumber = request.body.contactNumber;
		const age = request.body.age;
		const costPerHour = request.body.costPerHour;
		const userImage = data.Location;

		Staff.findById(staffId).then((staff) => {
			return Object.assign(staff, {
				name: name,
				email: email,
				contactNumber: contactNumber,
				age: age,
				costPerHour: costPerHour,
				userImage: userImage
			})
		}).then((staff) => {
			return staff.save();
		}).then((updatedStaff) => {
			response.status(201).send({
				message: "Staff Updated",
				updatedStaff
			})
		}).catch((e) => {
			response.send(e);
		})
	})

})
module.exports = router;

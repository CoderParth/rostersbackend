const express = require('express');
const router = express.Router({ mergeParams: true });
const PDFDocument = require('pdfkit')
const auth = require('../../controllers/authController');
const Staff = require('../../models/staffModel');

router.get('/', auth, async (request, response) => {
	const doc = new PDFDocument();
	const staffs = await Staff.find({ user: request.user.userId }).select('name email age contactNumber costPerHour -_id');
	filename = encodeURIComponent("rosters") + '.pdf'
	// Setting response to 'attachment' (download).
	response.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
	response.setHeader('Content-type', 'application/pdf')

	const content = staffs;
	doc.fontSize(15).text(`Roster Creator: ${request.user.userEmail}`, 100, 80);
	doc.save()
	//SOME SVG
	doc
		.scale(0.6)
		.translate(470, 130)
		.path('M 250,75 L 323,301 131,161 369,16 17,300 z')
		.fill('green', 'even-odd')
		.restore();
	doc
		.text("Please find your list of staffs down below(OBJECT FORMAT)", 100, 300)
		.font('Times-Roman', 13)
		.moveDown()
		.text(content, {
			width: 412,
			align: 'justify',
			indent: 30,
			columns: 2,
			height: 300,
			ellipsis: true
		});
	doc.pipe(response)
	doc.end()
})


module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.send('<html> A COMPLETE BACKEND MADE FOR "roster management like app"\nCheck out the source code and doumentation on <a href="https://github.com/CoderParth/rostersbackend"> github</a> </html>');
});
module.exports = router;

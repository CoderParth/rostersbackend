const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: Number,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	costPerHour: {
		type: Number,
		required: true,
	},
	user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model.Staff || mongoose.model("Staff", StaffSchema);

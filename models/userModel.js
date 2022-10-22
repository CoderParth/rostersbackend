const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email already exists"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		unique: false
	},

})

module.exports = mongoose.model.User || mongoose.model("User", UserSchema);

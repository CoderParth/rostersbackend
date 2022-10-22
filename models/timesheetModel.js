const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSheetSchema = new Schema({
	startDayTime: { type: Date, required: true },
	endDayTime: { type: Date, required: true },
	staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true }
})

module.exports = mongoose.model.TimeSheet || mongoose.model("TimeSheet", TimeSheetSchema);

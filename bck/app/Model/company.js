// address
// coordinator
// position
// venue
// is applied(boolean)


const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Company = new Schema(
  {
    title: { type: String, default: "", trim: true },
    comingDate: { type: Date },
    endTime: { type: Date },
    image: { type: String },
    description: { type: String },
    url: { type: String },
    venue: { type: String },
    position: { type: String },
    coordinator: { type: String },
    address: { type: String },
    studentId: [{ type: Schema.ObjectId, ref: "Student" }],
    resumeId: [{ type: Schema.ObjectId, ref: "Resume" }],
    /* ******************************* important point ************************************ */

    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isNotificationEnabled: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Company", Company);

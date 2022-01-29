// work experience

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Complaint = new Schema(
  {
    studentId: { type: Schema.ObjectId, ref: "Student" },
    targetId: { type: Schema.ObjectId, ref: "Student" },
    matter: { type: String, trim: true },
    adminResponse: { type: String, trim: true },
    /* ******************************* important point ************************************ */

    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Complaint", Complaint);

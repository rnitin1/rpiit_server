const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Alumini = new Schema(
  {
    name: { type: String, default: "", trim: true },
    email: { type: String, trim: true, default: "" },
    phoneNumber: { type: Number },
    rollNumber: { type: Number },
    placeOfWork: { type: String, trim: true },
    branch: { type: String, trim: true },
    deviceToken: { type: String, trim: true },
    deviceType: { type: String, trim: true },
    image: { type: String },
    batch: { type: String },
    organisation: { type: String },
    workingAs: { type: String },
    feedback: { type: String },

    /* ******************************* important point ************************************ */
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Alumini", Alumini);

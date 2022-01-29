// work experience



const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Resume = new Schema(
  {
    studentId: { type: Schema.ObjectId, ref: "Student" },
    name: { type: String, default: "", trim: true },
    fatherName: { type: String, default: "", trim: true },
    email: { type: String, trim: true, default: "" },
    phoneNumber: { type: String },
    rollNumber: { type: String },
    languages: { type: String, trim: true },
    achievements: { type: String, trim: true },
    projects: { type: String, trim: true },
    address: { type: String, trim: true },
    dob: { type: Date },
    branch: { type: String, trim: true },
    skills: { type: String, trim: true },
    certification: { type: String, trim: true },
    image: { type: String },
    stream: { type: String },
    isVerified: { type: Boolean, default: false },
    semester: { type: Number, index: true },
    college: { type: String, trim: true },
    highestEducation: { type: String },
    areaOfInterest: { type: String },
    experience: { type: String, trim: true, index: true },

    /* ******************************* important point ************************************ */

    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Resume", Resume);



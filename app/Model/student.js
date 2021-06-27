const mongoose = require("mongoose"),
  Schema = mongoose.Schema;



let Student = new Schema(
  {
    name: { type: String, default: "", trim: true },
    fatherName: { type: String, default: "", trim: true },
    email: { type: String, trim: true, default: "" },
    phoneNumber: { type: Number },
    rollNumber: { type: Number },
    password: { type: String, trim: true },
    address: { type: String, trim: true },
    dob: { type: Date },
    branch: { type: String, trim: true },
    deviceToken: { type: String, trim: true },
    deviceType: { type: String, trim: true },
    image: { type: String },
    stream: { type: String },
    isVerified: { type: Boolean, default: false },
    semester: { type: Number, index: true },
    college: { type: String, trim: true },
    isTeacher: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },

  
    /* ******************************* important point ************************************ */

    loginTime: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isNotificationEnabled: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Student", Student);



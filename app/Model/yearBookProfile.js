const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let YearBook = new Schema(
  {
    name: { type: String, default: "", trim: true },
    email: { type: String, trim: true, default: "" },
    phoneNumber: { type: String },
    rollNumber: { type: String },
    address: { type: String, trim: true },
    dob: { type: Date },
    branch: { type: String, trim: true },
    image: { type: String },
    stream: { type: String },
    isVerified: { type: Boolean, default: false },
    semester: { type: Number, index: true },
    q1: { type: String, trim: true },
    q2: { type: String, trim: true },
    q3: { type: String, trim: true },
    q4: { type: String, trim: true },
    q5: { type: String, trim: true },
    q6: { type: String, trim: true },
    q7: { type: String, trim: true },
    isTeacher: { type: Boolean, default: false },
    studentId: { type: Schema.ObjectId, ref: "Student" },
    comments:[{
      studentId:{type: Schema.ObjectId, ref: "Student" },
      comment:String
    }],

    /* ******************************* important point ************************************ */
    
    loginTime: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isNotificationEnabled: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("YearBook", YearBook);

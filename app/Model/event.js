const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let questionnaire = [
  /*  {type:String} */
  {
    question: { type: String },
    answerType: { type: String },
    options: [{ answerOptions: { type: String } }],
    correctAnswer: { type: String },
  },
];

let Event = new Schema(
  {
    title: { type: String, default: "", trim: true },
    coordinator: { type: String, default: "" },
    author: { type: String, default: "" },
    venue: { type: String },
    price: { type: Number, trim: true },
    startDate: { type: Date },

    image: { type: String },
    description: { type: String },
    url: { type: String },
    eventType: {
      type: String,
      enum: ["social", "cultural", "sports", "trips", "company"],
    },
    studentId: [{ type: Schema.ObjectId, ref: "Student" }],
    creatorId: { type: Schema.ObjectId, ref: "Student" },
    isFree: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },

    /* ******************************* important point ************************************ */

    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isNotificationEnabled: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now() },
    position:{ type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", Event);

// is applied(boolean)
// roll number
// age
// height
// weight
// sports interested in

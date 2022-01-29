const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Suggestion = new Schema(
  {
    studentId: { type: Schema.ObjectId, ref: "Student" },
    title: { type: String, default: "", trim: true },
    body: { type: String, default: "", trim: true },
    adminResponse: { type: String },
    isReplyDone: { type: Boolean, default: false },
    
    /* ******************************* important point ************************************ */

    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Suggestion", Suggestion);

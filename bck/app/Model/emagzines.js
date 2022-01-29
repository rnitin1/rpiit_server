const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let EMagazine = new Schema(
  {
    emagazine: String,
    title: String,
    image: { type: String },
    studentId: [{ type: Schema.ObjectId, ref: "Student" }],
    author: { type: String },
    description: { type: String },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
module.exports = mongoose.model("EMagazine", EMagazine);


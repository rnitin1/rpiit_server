

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;


let Anouncement = new Schema(
  {
    title: { type: String, default: "", trim: true },
    date: { type: Date },
    image: { type: String },
    description: { type: String },
    url: { type: String },
    /* ******************************* important point ************************************ */

    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isNotificationEnabled: { type: Boolean, default: true },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Anouncement", Anouncement);

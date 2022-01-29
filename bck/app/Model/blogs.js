const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Config = require("../config/errorStatus");

let Blog = new Schema(
  {
    title: String,
    image: String,

    description: { type: String },
    category: {
      type: String,
      // enum: [
      //   Config.CATEGORY_TYPE.SHEVOLVE_DESK,
      //   Config.CATEGORY_TYPE.GUEST_WRITERS,
      //   Config.CATEGORY_TYPE.LEARNING_OPPORTUNITY,
      // ],
    },
    lable: { type: String },
    created_on: { type: Date, default: Date.now() },
    comments: Array,
    likes: Array,
    /* ******************************* important point ************************************ */

    isDeleted: { type: Boolean, default: false },
    created_on: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Blog", Blog);

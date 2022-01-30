const mongoose = require("mongoose"),
  Schema = mongoose.Schema


let Admin = new Schema({
  name: { type: String, default: "Admin", trim: true },
  email: { type: String, trim: true, default: "" },
  password: { type: String, trim: true },
  actionType: {type: String, trim: true, required: true,},
  roleId: { type: Number, default: 2}, // 1 superadmin 2 admin



  /* ******************************* important point ************************************ */

  loginTime: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isNotificationEnabled: { type: Boolean, default: true },
  created_on: { type: Date, default: Date.now() }
}, { versionKey: false })

module.exports = mongoose.model("Admin", Admin);

 

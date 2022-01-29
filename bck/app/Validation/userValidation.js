const joi = require("joi")

module.exports = {
  signup : {
      body : {
          name : joi.string().required().error(() => " Name is required"),
          email : joi.string().email().required().error(() => "Email is required"),
          password : joi.string().required().error(() => "Password is required"),
          experience : joi.string(),
          domain : joi.string(),
          industry : joi.string()
      }
  },
  verifyOtp : {
      body : {
          email : joi.string().email().required().error(() => "Email is required"),
          otp : joi.string().required().error(() => "OTP is required")
      }
  },
  resendOtp : {
      body : {
          email : joi.string().email().required().error(() => "Email is required"),
          // phone_number : joi.string().required().error(() => "Phone number is required")
      }
  },
  login : {
      body : {
          email : joi.string().email().required().error(() => "Email is required"),
          password : joi.string().required().error(() => "Password is required"),
          device_type : joi.string(),
          device_id : joi.string(),
          device_token : joi.string()
      }
  },
  forgotPassword : {
      body : {
          email : joi.string().email().required().error(() => "Email is required")
      }
  },
  resetPassword : {
      body : {
          new_password : joi.string().required(),
          confirm_password : joi.string().required(),
      }
  },
  changePassword : {
      body : {
          old_password : joi.string().required(),
          new_password : joi.string().required()
      }
  }
};
const joi = require("joi")

exports.signup = (body) => {
  const schema = joi
    .object({
      name: joi.string().trim().lowercase(),
      email: joi.string().trim().lowercase(),
      phoneNumber: joi.number().trim(),
      password: joi.string().trim(),
      industry: joi.string().trim(),
      experience: joi.string().trim(),
      role: joi.string(),
      domain: joi.string(),
      takenBreak: joi.boolean(),
      userType: joi.string().valid("menetee", "mentor"),
    })
    .when(joi.object({ takenBreak: joi.boolean().valid(true) }).unknown(), {
      then: joi.object({
        noOfYearsOnBreak: joi.number(),
        OnBreakNow: joi.boolean (),
      }),
    })
    .when(joi.object({ userType: joi.boolean().valid("mentor") }).unknown(), {
      then: joi.object({
        mentoring: joi.boolean(),
        coaching: joi.boolean(),
        volunteering: joi.boolean(),
        conductSeminars: joi.boolean(),
        courseAuthoring: joi.boolean(),
        courseDelivery: joi.boolean(),
      }),
    });
  return schema.validate(body);
}

exports.login = (body) => {
  const schema = joi.object({
      email: joi.string().required().email().lowercase(),
      password: joi.string().min(6).required(),
  });
  return schema.validate(body);
}

exports.sendEBookToMail = (body) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().required().email(),

    phoneNumber: joi.string().optional().allow(null, ""),
  });
  return schema.validate(body);
};
exports.subscription = (body) => {
  const schema = joi.object({
    email: joi.string().required().email(),
  });
  return schema.validate(body);
};
const joi = require("joi");

exports.createEvent = (body) => {
  const schema = joi.object({
    name: joi.string().required(),
    venue: joi.string().required(),
    lable: joi.string().required().label("Description for listing"),
    hostedBy: joi.string().required(),
    questionnaire: joi.any().allow("", null),
    startTime: joi.date().required().label("Start time"),
    endTime: joi.date().iso().min(joi.ref("startTime"))./* label("End time"). */message("End time should be greater then start time"),
    image: joi.any(),
    isFree: joi.boolean(),
    price: joi.number().required().min(0).label("Price"),
    description: joi.string().required(),
  });
  return schema.validate(body);
};


exports.addYTVideo = (body) => {
  const schema = joi.object({
    title: joi.string().required(),
    videoId: joi.string().required().label("Video Link"),
    videoDuration: joi.string().required().label("Video Duration"),
    description: joi.string().required(),
  });
  return schema.validate(body);
};



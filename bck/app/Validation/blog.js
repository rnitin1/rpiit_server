const joi = require("joi");

// exports.createBlog = (body) => {
//   const schema = joi.object({
//     title: joi.string().required().label("Title"),
//     lable: joi.string().required().label("Description"),
//     category: joi.string().required().label("Category"),
//     image: joi.any().label("Display Image"),
//     description: joi.string().required().label("html content"),
//   });
//   return schema.validate(body);
// };


exports.createBlog = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required().label("Title"),
    lable: joi.string().required().label("Description"),
    category: joi.string().required().label("Category"),
    image: joi.any().label("Display Image"),
    description: joi.string().required().label("html content"),
  });
  // return schema.validate(req.body);
  let { error } = schema.validate(req.body);
  if (error)
  console.log(error,req.body);
    return res.send({
      customMessage: error.details[0].message,
      statusCode: 404,
    });
  next();
};

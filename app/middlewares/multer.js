var aws = require("aws-sdk"),
  multer = require("multer"),
  multerS3 = require("multer-s3"),
  config = require("../config/constants");
  aws.config.update({
  secretAccessKey: config.AWS_SECRET,
  accessKeyId: config.AWS_ID,
});
s3 = new aws.S3();
const storage = multer.diskStorage({
  destination: "./public/uploader",
  filename(req, file, cb) {
    let num = Math.round(
      Math.pow(36, 10 + 1) - Math.random() * Math.pow(36, 10)
    )
      .toString(36)
      .slice(1);
    var fileName = num + file.originalname;
    console.log(fileName, "88888888888888888");

    cb(null, fileName);
  },
});
const fileFilter = function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return callback(new Error("Only PDF is allowed"));
    }
    callback(null, true);
  }

exports.upload = multer({
  storage: storage,
  // limits: { fileSize: 100000000 },
  // fileFilter
});
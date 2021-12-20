let config = {};

config.port = process.env.PORT || 8000;
config.db_host = 'localhost';
config.db_port = "27017";
config.db_name = "rpiit";
config.db = "mongodb";
config.mail_id = process.env.MAIL_ID;
config.mail_password = process.env.MAIL_PASSWORD
config.razorpay_key_id = process.env.RAZORPAY_KEY_ID;
config.razorpay_key_secret = process.env.RAZORPAY_KEY_SECRET;

// config.AWS_ID = process.env.AWS_ID;
// config.AWS_SECRET = process.env.AWS_SECRET;
// config.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
config.AWS_ID = "AKIAJI62T7YZHG4WQPVQ";
config.AWS_SECRET = "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";
config.AWS_BUCKET_NAME = "shevolve";
config.EBOOKTEMPID = "d-694f509052b6473e89273e34cfadb529";
config.SUBSCRIPTIONTEMPID = "";
config.SIGNUPTEMPID = "";
config.JWT_KEY =  process.env.JWT_KEY;
module.exports = config;
  
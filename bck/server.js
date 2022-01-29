//********** */ Core Modules ******************//
const path = require("path")

/**************** 3rd Party Module**************** */
const express = require("express"),
  app = express(),
  mongoose = require('mongoose'),
  SwaggerUI = require("swagger-ui-express"),
  session = require('express-session'),
  randomString = require("randomstring"),
  cors = require("cors"),
  firebaseAdmin = require('firebase-admin');
require('dotenv').config();

/*************** Import Module *********************** */
const swagger = require("./app/config/swagger.json"),
  CONSTANTS = require("./app/config/constants"),
  MobileRoutes = require("./app/Routes/mobile"),
  Bootstrap = require("./app/utils/bootstrap");

  // firebase init
  const serviceAccount = require('./rpiit-78fbe-firebase-adminsdk-cmvr9-d99188f402.json')  
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
  // store as global
  global.firebaseAdmin = firebaseAdmin;


// Connection to mongoDB
mongoose.connect(`mongodb://localhost:27017/rpiit1`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// Connect Swagger
app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swagger))

// Middlewares
const middleware = [
  express.json({ type: "application/json" }),
  express.urlencoded({ extended: true }),
    // image, 
  express.raw(),
  express.static(path.join(__dirname, "public")),
  session({
    key: "id",
    secret: randomString.generate(32),
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  }),
  cors(),
];

app.use(middleware)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, accessToken'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});
/****************************Registering Admin************************ */
Bootstrap.bootstrapAdmin(function (err, message) {
  if (err) {
    console.log('Error while bootstrapping admin : ' + err)
  } else {
    console.log(message);
  }
}); 

app.use("/student", MobileRoutes.Student);
app.use("/admin", MobileRoutes.Admin);



/****************************************RPIIT ROUTES********************************8 */

process.on('uncaughtException', (code) => {
  console.log(`About to exit with code: ${code}`);
});

process.on('unhandledRejection', (code) => {
  console.log(`About to exit with code: ${code}`);
});
process.on("warning", (e) => console.warn(e.stack));
app.listen(CONSTANTS.port, () => console.log("Listening on port", CONSTANTS.port))


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
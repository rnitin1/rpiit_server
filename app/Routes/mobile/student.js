const multer = require("../../middlewares/multer");

const express = require("express"),
  Route = express.Router(),
  Controller = require("../../Controller/mobile");

Route.post("/signup", Controller.Student.signup);
Route.post("/login", Controller.Student.login);
Route.post("/addResume", Controller.Student.addResume);
Route.post("/addMagzine",multer.upload.single("emagazine"),Controller.Student.addMagzine);
Route.get("/getAllMagzines", Controller.Student.getAllMagzines);
Route.get("/getOneMagzine/:id", Controller.Student.getOneMagzine);

Route.post(
  "/addEvent",
  multer.upload.single("image"),
  Controller.Student.addEvent
);
// Route.post(
//   "/addEvent",
//   multer.upload.single("image"),
//   Controller.Student.addEvent
// );
Route.post("/getStudent", Controller.Student.getStudent);
Route.post("/UserComplaint", Controller.Student.UserComplaint);
Route.post("/getComplaint", Controller.Student.getComplaint);
Route.post("/userSuggestion", Controller.Student.userSuggestion);
Route.post("/addAlumini", Controller.Student.addAlumini);
Route.post("/forgotPassword", Controller.Student.forgotPassword);
Route.post("/getResume", Controller.Student.getResume);
Route.post("/updateResume/:id", Controller.Student.updateResume);

module.exports = Route;

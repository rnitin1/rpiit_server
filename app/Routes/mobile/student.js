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
Route.delete("/deleteEvent/:eventId", Controller.Student.deleteEvent);

// Route.post(
//   "/addEvent",
//   multer.upload.single("image"),
//   Controller.Student.addEvent
// );
Route.post("/getStudent", Controller.Student.getStudent);
Route.post("/getFinalYearStudent", Controller.Student.getFinalYearStudent);
Route.post("/UserComplaint", Controller.Student.UserComplaint);
Route.post("/getComplaint", Controller.Student.getComplaint);
Route.post("/userSuggestion", Controller.Student.userSuggestion);
Route.post("/addAlumini", Controller.Student.addAlumini);
Route.post("/forgotPassword", Controller.Student.forgotPassword);
Route.post("/getResume", Controller.Student.getResume);
Route.post("/changePassword", Controller.Student.changePassword);
Route.post("/getEventByType", Controller.Student.getEventByType);
Route.post("/updateResume/:id", Controller.Student.updateResume);
Route.post("/addYearBook", Controller.Student.addYearBook);
Route.post("/giveCommentToFinalYearStur", Controller.Student.giveCommentToFinalYearStur);
Route.post("/applyEvent", Controller.Student.applyEvent);
Route.post("/getOneYearBook", Controller.Student.getOneYearBook);




module.exports = Route;

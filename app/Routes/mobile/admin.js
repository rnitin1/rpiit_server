const multer = require('../../middlewares/multer');

const express = require('express'),
  Route = express.Router(),
  Controller = require('../../Controller/mobile');

Route.post("/verifyStudent", Controller.Admin.verifyStudent);
Route.post("/addStudent", Controller.Admin.addStudent);
Route.post("/login", Controller.Admin.login);
Route.post("/updateStudent/:id", Controller.Admin.updateStudent);
Route.post("/verifyEvent", Controller.Admin.verifyEvent);



Route.post('/addStudent', Controller.Admin.addStudent);
Route.post('/updateStudent/:id', Controller.Admin.updateStudent);
Route.get('/getAllStudent', Controller.Admin.getAllStudent);
Route.get('/getOneStudent', Controller.Admin.getOneStudent);
Route.get('/getAllAlumini', Controller.Admin.getAllAlumini);

Route.delete('/deleteMagzines/:magzineId', Controller.Admin.deleteMagzines);
Route.post(
  '/addAnnouncement',
  multer.upload.single('image'),
  Controller.Admin.addAnnouncement
);
Route.get('/getAnnouncement', Controller.Admin.getAnnouncement);
Route.delete('/deleteAnnouncement/:id', Controller.Admin.deleteAnnouncement);

Route.get('/getAllSuggestion', Controller.Admin.getAllSuggestion);
Route.get('/getAllVerifiedStudent', Controller.Admin.getAllVerifiedStudent);
Route.delete('/deleteStudent/:id', Controller.Admin.deleteStudent);



module.exports = Route;

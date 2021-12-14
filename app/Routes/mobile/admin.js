const { userAuth } = require('../../middlewares/auth');
const multer = require('../../middlewares/multer');

const express = require('express'),
  Route = express.Router(),
  Controller = require('../../Controller/mobile');

Route.post('/verifyStudent', userAuth, Controller.Admin.verifyStudent);
// Route.post("/addStudent", Controller.Admin.addStudent);
Route.post('/login', Controller.Admin.login);
Route.post('/updateStudent/:id', Controller.Admin.updateStudent);
Route.post('/verifyEvent', userAuth, Controller.Admin.verifyEvent);

Route.post('/addStudent', userAuth, Controller.Admin.addStudent);
Route.post('/updateStudent/:id', Controller.Admin.updateStudent);
Route.get('/getAllStudent', Controller.Admin.getAllStudent);
Route.get('/getOneStudent', Controller.Admin.getOneStudent);
Route.get('/getAllAlumini', Controller.Admin.getAllAlumini);

Route.delete(
  '/deleteMagzines/:magzineId',
  userAuth,
  Controller.Admin.deleteMagzines
);
Route.post(
  '/addAnnouncement',
  multer.upload.single('image'),
  userAuth,
  Controller.Admin.addAnnouncement
);
Route.post('/changeSemester', Controller.Admin.changeSemester);
Route.get('/getAnnouncement', Controller.Admin.getAnnouncement);
Route.delete(
  '/deleteAnnouncement/:id',
  userAuth,
  Controller.Admin.deleteAnnouncement
);

Route.get('/getAllSuggestion', Controller.Admin.getAllSuggestion);
Route.get('/getAllVerifiedStudent', Controller.Admin.getAllVerifiedStudent);
Route.delete('/deleteStudent/:id', userAuth, Controller.Admin.deleteStudent);
Route.post('/getAppliedStudents', Controller.Admin.getAppliedStudents);
Route.post('/editStudent/:id', Controller.Admin.updateStudent);

module.exports = Route;
// pull ni lia tune?nai bhul gaya

//  copy krle jo code kia d okok

const { Student } = require("../../Model");
const universalFunction = require("../../UniversalFuntions"),
  db = require("../../services/dboperations"),
  Model = require("../../Model"),
  config = require("../../config"),
  validations = require("../../Validation"),
  randomstring = require("randomstring");
const { sendMail1 } = require("../../utils/sendMail");
let path = "http://3.12.68.246:8000/uploader/";

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let searchObj = {
      email,
    };
    let studentData = await db.findOne(Model.Admin, searchObj);
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_EMAIL);
    let verifyPassword = await universalFunction.Password.verifyPassword(
      password,
      studentData.password
    );
    if (!verifyPassword)
      return res
        .status(400)
        .send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_PASSWORD);

    let accessToken = await universalFunction.JwtAuth.jwtSign(
      studentData._id,
      studentData.email
    );
    console.log("token", accessToken);
    return res.status(200).send({
      data: studentData,
      accessToken,
      customMessage: "Successfully logged in",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.addStudent = async (req, res) => {
  try {
    let {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
      deviceToken,
      deviceType,
      image,
      semester,
      college,
      isTeacher,
      course,
      isStudent,
    } = req.body;
    console.log("body",req.body);
    let criteria = { email };
    let checkStudent = await db.findOne(Model.Student, criteria);
    if (checkStudent && checkStudent.isVerified === true)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ALREADY_EXISTS_EMAIL);
    if (checkStudent && checkStudent.isVerified === false)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ACCOUNT_NOT_VERIFIED);
    let code = randomstring.generate(8);
    let password = code.toUpperCase();
    let hashPassword = await universalFunction.Password.getPassword(password);
    let dataToSave = {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
      deviceToken,
      deviceType,
      image,
      semester,
      college,
      isTeacher,
      isStudent,
      course,
      isVeriFied: true,
      password: hashPassword,
    };
    let subject = "Your account password ";
    await sendMail1(email, subject, password).then(async (res) => {
      await Student.update({ email }, dataToSave, { new: true, lean: true });
    });
    let saveData = await db.saveData(Model.Student, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Your Account is under verification",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("=========================", err);
  }
};

exports.verifyStudent = async (req, res) => {
  try {
    let { studentId } = req.body;
    console.log(req.body);
    let studentData = await db.findOne(Model.Student, { _id: studentId });
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_EMAIL);
    let updateStudentData = await db.findAndUpdate(
      Model.Student,
      { _id: studentId },
      { isVerified: true },
      { new: true }
    );
    return res.status(200).send({
      data: updateStudentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllStudent = async (req, res) => {
  try {
    let studentData = await db.getData(Model.Student);
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    let studentData = await db.populateData(
      Model.Student,
      {
        _id: req.query.studentId,
      },
      {},
      {},
      "events"
    );
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllSuggestion = async (req, res) => {
  try {
    let suggestionData = await Model.Suggestion.find().populate("studentId");
    if (!suggestionData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: suggestionData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getSingleSuggestion = async (req, res) => {
  try {
    let suggestionData = await Model.Suggestion.findOne({
      _id: req.params.id,
    }).populate("studentId");
    if (!suggestionData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: suggestionData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.replyToComplaint = async (req, res) => {
  try {
    let { compalaintId, reply } = req.body;
    let updateComplaint = await db.findAndUpdate(
      Model.Complaint,
      { _id: compalaintId },
      { adminResponse: reply },
      { new: true }
    );
    return res.status(200).send({
      data: updateComplaint,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.replyToSuggetion = async (req, res) => {
  try {
    let { suggetionId, reply } = req.body;
    let updateSuggetion = await db.findAndUpdate(
      Model.Suggestion,
      { _id: suggetionId },
      { adminResponse: reply },
      { new: true }
    );
    return res.status(200).send({
      data: updateSuggetion,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.deleteMagzines = async (req, res) => {
  try {
    let { magzineId } = req.params;
    let deleteMagzine = await db.remove(Model.Emagzines, { _id: magzineId });
    if (!deleteMagzine)
      return res.send({
        statusCode: 400,
        message: "Something went wrong",
      });
    res.send({
      statusCode: 200,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllAlumini = async (req, res) => {
  try {
    let studentData = await db.getData(Model.Alumini);
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    let {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
    } = req.body;
    console.log(req.files);
    /**********************************HANDLE DRIVER***************************** */
    let checkStudent = await db.findOne(Model.Student, { _id: req.params.id });
    console.log(checkStudent, req.params.id);
    if (!checkStudent)
      return res.status(400).send({ message: "Student not exists" });
    let dataToSet = {
      name: name || checkStudent.name,
      fatherName: fatherName || checkStudent.fatherName,
      phoneNumber: phoneNumber || checkStudent.phoneNumber,
      address: address || checkStudent.address,
      dob: dob || checkStudent.dob,
      branch: branch || checkStudent.branch,
      rollNumber: rollNumber || checkStudent.rollNumber,
      updatedAt: Date.now(),
    };
    if (email) {
      let code = randomstring.generate(8);
      let password = code.toUpperCase();
      await sendMail1(email, subject, password).then(async (res) => {
        await User.update({ email }, dataToSave, { new: true, lean: true });
      });
      dataToSet.email = email;
    }
    let updateStudent = await db.findAndUpdate(
      Model.Student,
      { _id: req.params.id },
      dataToSet,
      { new: true }
    );
    return res.send({
      data: updateStudent,
      message: "updated successfuly",
    });
  } catch (err) {
    console.log("===========", err);
    res.status(400).send({ message: "Please enter valid data" });
  }
};

exports.addAnnouncement = async (req, res) => {
  try {
    let { title, date, description, url } = req.body;
    console.log({ title, date, description, url , image:req.file});
    let saveData = await db.saveData(Model.Announcement, {
      ...req.body,
      image: req.file ? path + req.file.filename : "",
    });
    res.status(200).send({
      data: saveData,
      customMessage: "OK",
      statusCode: 200,
      // count,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.changeSemester = async (req, res) => {
  try {
    let { branch } = req.body;
    if (
      branch === "engineering" ||
      branch === "bhm&ct" ||
      branch === "b-pharma" ||
      branch === "bsc-n" ||
      branch === "bpt" ||
      branch === "baslp"
    ) {
      console.log("comming 1");
      let changeSemester = await db.updateMany(
        Model.Student,
        { semester: { $lt: 8 } },
        { $inc: { semester: 1 } },
        { new: true }
      );
      await db.updateMany(
        Model.Student,
        { semester: { $gte: 7 } },
        { isFinalYear: true },
        { new: true }
      );
      return res.send({
        statusCode: 200,
        message: "ok",
        data: changeSemester,
      });
    }
    if (
      branch === "diploma" ||
      branch === "bba" ||
      branch === "dmlt" ||
      branch === "gnm" ||
      branch === "rac" ||
      branch === "bsfi" ||
      branch === "mit"
    ) {
      console.log("comming 2");
      let changeSemester = await db.updateMany(
        Model.Student,
        { semester: { $lt: 6 } },
        { $inc: { semester: 1 } },
        { new: true }
      );
      await db.updateMany(
        Model.Student,
        { semester: { $gte: 5 } },
        { isFinalYear: true },
        { new: true }
      );
      return res.send({
        statusCode: 200,
        message: "ok",
        data: changeSemester,
      });
    }
    if (
      branch === "mtech" ||
      branch === "mba" ||
      branch === "d-pharma" ||
      branch === "anm" ||
      branch === "post-basic-n"
    ) {
      console.log("comming 3");

      let changeSemester = await db.updateMany(
        Model.Student,
        { semester: { $lt: 4 } },
        { $inc: { semester: 1 } },
        { new: true }
      );
      await db.updateMany(
        Model.Student,
        { semester: { $gte: 2 } },
        { isFinalYear: true },
        { new: true }
      );
      return res.send({
        statusCode: 200,
        message: "ok",
        data: changeSemester,
      });
    }
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAnnouncement = async (req, res) => {
  try {
    let announcement = await db.getData(Model.Announcement);
    if (!announcement)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: announcement,
      customMessage: "Successfull",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};


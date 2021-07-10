const universalFunction = require("../../UniversalFuntions"),
  db = require("../../services/dboperations"),
  Model = require("../../Model"),
  config = require("../../config"),
  validations = require("../../Validation");
const { sendMail } = require("../../utils/sendMail");

exports.signup = async (req, res) => {
  try {
    let {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      password,
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
    } = req.body;
    // let { error } = validations.Mentee.signup(req.body);
    // if (error)
    //   return res.send({
    //     customMessage: error.details[0].message,
    //     statusCode: 404,
    //   });
    let criteria = { email };
    let checkStudent = await db.findOne(Model.Student, criteria);
    if (checkStudent && checkStudent.isVerified === true)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ALREADY_EXISTS_EMAIL);
    if (checkStudent && checkStudent.isVerified === false)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ACCOUNT_NOT_VERIFIED);
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
      password: hashPassword,
    };
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

exports.login = async (req, res) => {
  try {
    let { email, password, deviceToken, deviceType, phoneNumber } = req.body;
    let searchObj = {
      $or: [email, phoneNumber],
    };
    let studentData = await db.findOne(Model.Student, searchObj);
    if (!studentData || studentData.isVeriFied == false)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_EMAIL);
    let verifyPassword = await universalFunction.Password.verifyPassword(
      password,
      studentData.password
    );
    if (!verifyPassword)
      return res
        .status(400)
        .send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_PASSWORD);
    let updateStudentData = await db.update(
      Model.Student,
      { email },
      { deviceToken, deviceType },
      { new: true }
    );

    let accessToken = await universalFunction.JwtAuth.jwtSign(
      studentData._id,
      studentData.email
    );
    console.log("token", accessToken);
    return res.status(200).send({
      data: updateStudentData,
      accessToken,
      customMessage: "Successfully logged in",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.addResume = async (req, res) => {
  try {
    let {
      studentId,
      name,
      fatherName,
      email,
      phoneNumber,
      rollNumber,
      languages,
      achievements,
      projects,
      address,
      dob,
      branch,
      skills,
      certification,
      image,
      semester,
      college,
      highestEducation,
      areaOfInterest,
      experience,
    } = req.body;
    let criteria = { email };
    let checkStudent = await db.findOne(Model.Resume, criteria);
    if (checkStudent)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ALREADY_EXISTS_EMAIL);

    let dataToSave = {
      studentId,
      name,
      fatherName,
      email,
      phoneNumber,
      rollNumber,
      languages,
      achievements,
      projects,
      address,
      dob,
      branch,
      skills,
      certification,
      image,
      semester,
      college,
      highestEducation,
      areaOfInterest,
      experience,
    };
    let saveData = await db.saveData(Model.Resume, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Your Account is under verification",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.addMagzine = async (req, res) => {
  try {
    let { title, image, author, description, studentId } = req.body;
    console.log(req.file);

    let dataToSave = {
      title,
      image,
      author,
      description,
      studentId,
      emagazine: req.file.filename,
    };
    let saveData = await db.saveData(Model.Emagzines, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Magzine Added",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllMagzines = async (req, res) => {
  try {
    let getData = await db.getData(Model.Emagzines);
    res.status(200).send({
      data: getData,
      customMessage: "ok",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getOneMagzine = async (req, res) => {
  try {
    let getData = await db.findOne(Model.Emagzines, { _id: req.params.id });
    res.status(200).send({
      data: getData,
      customMessage: "ok",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

// exports.addMagzine = async (req, res) => {
//   try {
//     let { title, image, author, description } = req.body;

//     let dataToSave = {
//       title,
//       image,
//       author,
//       description,
//       emagazine: req.file.emagazine,
//     };
//     let saveData = await db.saveData(Model.Event, dataToSave);
//     res.status(200).send({
//       data: saveData,
//       customMessage: "Magzine Added",
//       statusCode: 200,
//     });
//   } catch (err) {
//     res.status(401).send(err);
//     return console.log("ERROR", err);
//   }
// };

exports.getStudent = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.body.skip); // Make sure to parse the skip to number
    let searchObj = {};
    if (req.body.search) {
      searchObj = {
        $or: [
          { name: { $regex: req.body.search, $options: "i" } },
          { phoneNumber: req.body.search },
          { email: req.body.search },
          { _id: req.body.search },
        ],
      };
    }
    let count = await Model.Student.countDocuments(searchObj);
    let users = await Model.Student.find(searchObj).skip(skip).limit(limit);
    res.status(200).send({
      data: users,
      customMessage: "OK",
      statusCode: 200,
      count,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.UserComplaint = async (req, res) => {
  try {
    let { studentId, targetId, matter } = req.body;
    let dataToSave = { studentId, targetId, matter };
    let saveData = await db.saveData(Model.Complaint, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Complaint Added",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getComplaint = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.body.skip); // Make sure to parse the skip to number
    let complaintObj = {};
    if (req.body.complaintId) {
      complaintObj = {
        $or: [{ _id: req.body.complaintId }],
      };
    }
    let count = await Model.Complaint.countDocuments(complaintObj);
    let users = await Model.Complaint.findOne(complaintObj);
    // .skip(skip).limit(limit);
    res.status(200).send({
      data: users,
      customMessage: "OK",
      statusCode: 200,
      count,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.userSuggestion = async (req, res) => {
  try {
    let { studentId, title, body } = req.body;
    let saveData = await db.saveData(Model.Suggestion, { ...req.body });
    res.status(200).send({
      data: saveData,
      customMessage: "OK",
      statusCode: 200,
      count,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.addAlumini = async (req, res) => {
  try {
    let {
      name,
      rollNumber,
      phoneNumber,
      email,
      branch,
      batch,
      organisation,
      workingAs,
      feedback,
      placeOfWork,
    } = req.body;

    let dataToSave = {
      name,
      rollNumber,
      phoneNumber,
      email,
      branch,
      batch,
      organisation,
      workingAs,
      feedback,
      placeOfWork,
    };
    let saveData = await db.saveData(Model.Alumini, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Magzine Added",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    let checkUser = await Model.Student.findOne({ email });
    if (!checkUser) return res.status(404).json({ message: "User not found" });
    let code = randomstring.generate(8);
    let password = code.toUpperCase();
    let dataToSave = {
      password: await bcrypt.hash(password, 10),
    };
    // let template = await forgotPasswordTemplate(password);
    // let subject = "Reset Password";
    await sendMail(email, subject, password).then(async (res) => {
      await User.update({ email }, dataToSave, { new: true, lean: true });
    });
    res.status(200).send({ message: "Password has been sent to your mail" });
  } catch (err) {
    res.send(err);
  }
};

exports.updateResume = async (req, res) => {
  try {
    let {
      name,
      fatherName,
      email,
      phoneNumber,
      rollNumber,
      languages,
      achievements,
      projects,
      address,
      dob,
      branch,
      skills,
      certification,
      image,
      semester,
      college,
      highestEducation,
      areaOfInterest,
      experience,
    } = req.body;
    console.log(req.files);
    /**********************************HANDLE DRIVER***************************** */
    let checkStudent = await db.findOne(Model.Resume, { _id: req.params.id });
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
      languages: languages || checkStudent.languages,
      achievements: achievements || checkStudent.achievements,
      projects: projects || checkStudent.projects,
      skills: skills || checkStudent.skills,
      certification: certification || checkStudent.certification,
      image: image || checkStudent.image,
      semester: semester || checkStudent.semester,
      college: college || checkStudent.college,
      highestEducation: highestEducation || checkStudent.highestEducation,
      areaOfInterest: areaOfInterest || checkStudent.areaOfInterest,
      experience: experience || checkStudent.experience,
      email: email || checkStudent.email,
      updatedAt: Date.now(),
    };

    let updateStudent = await db.findAndUpdate(
      Model.Resume,
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

exports.addEvent = async (req, res) => {
  try {
    let {
      title,
      coordinator,
      author,
      venue,
      startDate,
      image,
      description,
      url,
      eventType,
      // deviceType,
    } = req.body;

    let dataToSave = {
      title,
      coordinator,
      author,
      venue,
      startDate,
      description,
      url,
      eventType,
    };
    if (deviceType === "mobile") {
      dataToSave.image = image;
    } else {
      dataToSave.image = req.file.filename;
      dataToSave.isVerify = true;
    }
    let saveData = await db.saveData(Model.Event, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Event Added",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.applyEvent = async (req, res) => {
  try {
    let { studentId, eventId } = req.body;
    let findAlreadyApplied = await db.findOne(Model.Student, {
      _id: studentId,
      events: eventId,
    });

    if (findAlreadyApplied)
      return res.send({
        customMessage: "Event Already applied",
        statusCode: 406,
      });

    let updateStudent = db.findAndUpdate(
      Model.Student,
      { _id: studentId },
      {
        $push: {
          events: eventId,
        },
      },
      { new: true }
    );
    let updateEvent = db.findAndUpdate(
      Model.Event,
      { _id: eventId },
      {
        $push: {
          studentId,
        },
      },
      { new: true }
    );
    let [studentData, eventData] = await Promise.all([
      updateStudent,
      updateEvent,
    ]);
    return res.send({
      data: { studentData, eventData },
      customMessage: "Event Added",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports;

const HttpError = require("../../models/http-error");
const Student = require("../../models/studentDB");
const getAdmission = (req, res, next) => {
  res.json({ message: "admission route" });
};

const getStudentsList = async (req, res, next) => {
  let students;
  try {
    students = await Student.find();
  } catch (err) {
    console.log("Couldnt get list of students");
    res.send(new HttpError("No students Found", 404));
    return;
  }
  res.json({
    students: students.map((student) => student.toObject({ getters: true })),
  });
};
const admitStudent = async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    birthDate,
    religion,
    admissionNumber,
    grade,
    section,
    rollNumber,
    parentFirstName,
    parentLastName,
    parentRelation,
    parentPhoneNumber,
    email,
    province,
    street,
    houseNumber,
    // siblingGrade,
    // siblingSection,
    // siblingName,
  } = req.body;

  // console.log(req.body);

  let existingUser;
  try {
    existingUser = await Student.findOne({ email: email });
  } catch (err) {
    console.log("error looking for email to create student");
    // return;
  }

  if (existingUser) {
    res.send(new HttpError("userAlready Exists", 404));
    console.log("userAlready Exists");
    return;
  }

  const student = new Student({
    firstName,
    lastName,
    gender,
    birthDate,
    religion,
    admissionNumber,
    grade,
    section,
    rollNumber,
    parentFirstName,
    parentLastName,
    parentRelation,
    parentPhoneNumber,
    email,
    province,
    street,
    houseNumber,
    // siblingGrade,
    // siblingSection,
    // siblingName,
  });

  try {
    await student.save();
    res.status(201).json({ student: student.toObject({ getters: true }) });
  } catch (err) {
    return new HttpError("Error in DB schema", 500);
  }
};

const updateStudent = async (req, res, next) => {
  // console.log(req.body);
  const {
    firstNameExisiting,
    lastNameExisiting,
    genderExisiting,
    birthDateExisiting,
    religionExisiting,
    admissionNumberExisiting,
    gradeExisiting,
    sectionExisiting,
    rollNumberExisiting,
    parentFirstNameExisiting,
    parentLastNameExisiting,
    parentRelationExisiting,
    parentPhoneNumberExisiting,
    emailExisiting,
    provinceExisiting,
    streetExisiting,
    houseNumberExisiting,
    // siblingGradeExisiting,
    // siblingSectionExisiting,
    // siblingNameExisiting,
  } = req.body;

  let existingUser;
  try {
    existingUser = await Student.findOne({
      admissionNumber: admissionNumberExisiting,
    });
    // console.log(req.body);
  } catch (err) {
    console.log("error looking for email to create student");
  }

  if (!existingUser) {
    res.send(new HttpError("Student Does Not Exist", 404));
    console.log("Student Does Not Exist");
    return;
  }

  let student;

  try {
    student = await Student.replaceOne(
      { admissionNumber: admissionNumberExisiting },
      {
        firstName: firstNameExisiting,
        lastName: lastNameExisiting,
        gender: genderExisiting,
        birthDate: birthDateExisiting,
        religion: religionExisiting,
        admissionNumber: admissionNumberExisiting,
        grade: gradeExisiting,
        section: sectionExisiting,
        rollNumber: rollNumberExisiting,
        parentFirstName: parentFirstNameExisiting,
        parentLastName: parentLastNameExisiting,
        parentRelation: parentRelationExisiting,
        parentPhoneNumber: parentPhoneNumberExisiting,
        email: emailExisiting,
        province: provinceExisiting,
        street: streetExisiting,
        houseNumber: houseNumberExisiting,
        // siblingGradeExisiting,
        // siblingSectionExisiting,
        // siblingNameExisiting,
      }
    );
    console.log(student);
    res.status(201).json({ student: student });
  } catch (err) {
    console.log(err);
    res.send(new HttpError("Student Does Not Exist", 404));
    return new HttpError("Error in DB schema", 500);
  }
};

exports.getAdmission = getAdmission;
exports.admitStudent = admitStudent;
exports.updateStudent = updateStudent;
exports.getStudentsList = getStudentsList;

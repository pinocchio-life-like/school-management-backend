const HttpError = require("../../models/http-error");
const Teacher = require("../../models/teacherDB");
const Course = require("../../models/courseDB");
const Attending = require("../../models/attendingDB");

const getTeachers = async (req, res, next) => {
  let teachers;
  try {
    teachers = await Teacher.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    teachers: teachers.map((teachers) => teachers.toObject({ getters: true })),
  });
};

const deleteTeachers = async (req, res, next) => {
  try {
    await Teacher.deleteOne({ teacherId: req.params.id });
    res.status(201).json({ deleted: "successful" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete teacher", 404));
  }
};

const registerTeachers = async (req, res, next) => {
  const {
    teacherName,
    teacherId,
    competitionalLevel,
    grade,
    status,
    coursesId,
    assignedTo,
  } = req.body;
  const teachers = new Teacher({
    teacherId: teacherId,
    teacherName: teacherName,
    competitionalLevel: competitionalLevel,
    grade: grade,
    status: status,
    coursesId: coursesId,
    assignedTo: assignedTo,
  });

  try {
    const existingTeacher = await Teacher.findOne({
      teacherId: teacherId,
    });

    if (!existingTeacher) {
      await teachers.save();
      res.status(201).json({ teachers: teachers.toObject({ getters: true }) });
      return;
    }

    await Teacher.replaceOne(
      { teacherId: teacherId },
      {
        teacherId: teacherId,
        teacherName: teacherName,
        competitionalLevel: competitionalLevel,
        grade: grade,
        status: status,
        coursesId: coursesId,
        assignedTo: assignedTo,
      }
    );

    await Course.updateMany(
      { teacherId: teacherId },
      {
        $set: {
          teacherId: "Not Assigned",
        },
      }
    );
    if (status === "Assigned") {
      for (let i = 0; i < assignedTo[0].length; i++) {
        await Course.updateOne(
          {
            courseId: assignedTo[0][i],
          },
          {
            $set: {
              teacherId: teacherId,
            },
          }
        );
      }
    }
    res.status(201).json({ teachers: teachers });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

const getAttending = async (req, res, next) => {
  let attenders;
  try {
    attenders = await Attending.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    attenders: attenders.map((attenders) =>
      attenders.toObject({ getters: true })
    ),
  });
};

const setAttending = async (req, res, next) => {
  const { grade, teacherId, teacherName } = req.body;
  const attenders = new Attending({
    grade: grade,
    teacherId: teacherId,
    teacherName: teacherName,
  });

  try {
    const existingAttender = await Attending.findOne({
      teacherId: teacherId,
    });

    if (!existingAttender) {
      await attenders.save();
      res
        .status(201)
        .json({ attenders: attenders.toObject({ getters: true }) });
      return;
    }
    res.status(404).json({ message: "Attender Already Exists", code: 404 });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Check your internet and try again!", code: 404 });
  }
};
const deleteAttender = async (req, res, next) => {
  try {
    await Attending.deleteOne({ teacherId: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete teacher", 404));
  }
};

exports.deleteAttender = deleteAttender;
exports.getAttending = getAttending;
exports.setAttending = setAttending;
exports.getTeachers = getTeachers;
exports.deleteTeachers = deleteTeachers;
exports.registerTeachers = registerTeachers;

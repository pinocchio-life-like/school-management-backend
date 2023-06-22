const HttpError = require("../../models/http-error");
const CalenderYear = require("../../models/calenderYearListDB");
const Student = require("../../models/studentDB");
const Course = require("../../models/courseDB");
const Mark = require("../../models/markDB");

const calenderList = async (req, res, next) => {};

const admitIndividual = async (req, res, next) => {
  try {
    await Student.updateOne(
      { admissionNumber: req.body.admissionNumber },
      {
        $set: {
          admissionStatus: "admitted",
        },
      }
    );
    const student = await Student.findOne({
      admissionNumber: req.body.admissionNumber,
    });
    await CalenderYear.updateOne(
      {
        year: req.body.year,
        grade: req.body.grade,
      },
      {
        $set: {
          year: req.body.year,
          grade: req.body.grade,
        },
        $push: { studentsId: req.body.admissionNumber },
      },
      {
        upsert: true,
      }
    );
    let courses = await Course.find();
    courses = courses.filter((data) => {
      return data.offered === "Offered" && data.grade === req.body.grade;
    });

    for (let i = 0; i < courses.length; i++) {
      const mark = new Mark({
        markId: req.body.admissionNumber,
        studentName: `${student.firstName} ${student.lastName}`,
        courseId: courses[i].courseId,
        year: req.body.year,
        grade: req.body.grade,
        section: student.section,
        firstSemister: [
          {
            mark1: 0,
            mark2: 0,
            mark3: 0,
            mark4: 0,
            mark5: 0,
            final: 0,
          },
        ],
        secondSemister: [
          {
            mark1: 0,
            mark2: 0,
            mark3: 0,
            mark4: 0,
            mark5: 0,
            final: 0,
          },
        ],
      });
      const existingMark = await Mark.findOne({
        markId: req.body.admissionNumber,
        courseId: courses[i].courseId,
      });
      if (!existingMark) {
        await mark.save();
      }
    }
  } catch (err) {
    console.log(err);
    res.send(new HttpError("Couldnt admit student", 404));
  }
  res.status(201).json({ message: "successfully admitted" });
};

const expelIndividual = async (req, res, next) => {
  try {
    await Student.updateOne(
      { admissionNumber: req.body.admissionNumber },
      {
        $set: {
          admissionStatus: "not admitted",
        },
      }
    );
    await CalenderYear.updateOne(
      {
        year: req.body.year,
        grade: req.body.grade,
      },
      {
        $pull: { studentsId: req.body.admissionNumber },
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(err);
    res.send(new HttpError("Couldnt admit student", 404));
  }
  res.status(201).json({ message: "successfully admitted" });
};
exports.calenderList = calenderList;
exports.admitIndividual = admitIndividual;
exports.expelIndividual = expelIndividual;

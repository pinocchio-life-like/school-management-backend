const HttpError = require("../../models/http-error");
const Mark = require("../../models/markDB");

const getMarks = async (req, res, next) => {
  let marks;
  try {
    marks = await Mark.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    marks: marks.map((marks) => marks.toObject({ getters: true })),
  });
};

const deleteMarks = async (req, res, next) => {
  try {
    await Mark.deleteOne({ _id: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete Mark", 404));
  }
};

const admitMarks = async (req, res, next) => {
  const {
    markId,
    studentName,
    courseId,
    firstSemister,
    secondSemister,
    finalGrade,
    firstGrade,
    secondGrade,
    year,
    grade,
    section,
  } = req.body;

  const marks = new Mark({
    markId: markId,
    studentName: studentName,
    courseId: courseId,
    firstSemister: firstSemister,
    secondSemister: secondSemister,
    finalGrade: finalGrade,
    firstGrade: firstGrade,
    secondGrade: secondGrade,
    year: year,
    grade: grade,
    section: section,
  });

  try {
    const existingMark = await Mark.findOne({
      markId: markId,
      courseId: courseId,
    });

    if (!existingMark) {
      await marks.save();
      res.status(201).json({ marks: marks.toObject({ getters: true }) });
      return;
    }

    await Mark.replaceOne(
      { markId: markId, courseId: courseId },
      {
        markId: markId,
        studentName: studentName,
        courseId: courseId,
        firstSemister: firstSemister,
        secondSemister: secondSemister,
        finalGrade: finalGrade,
        firstGrade: firstGrade,
        secondGrade: secondGrade,
        year: year,
        grade: grade,
        section: section,
      }
    );
    res.status(201).json({ marks: marks });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

exports.getMarks = getMarks;
exports.deleteMarks = deleteMarks;
exports.admitMarks = admitMarks;

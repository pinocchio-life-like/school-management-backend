const HttpError = require("../../models/http-error");
const Attendance = require("../../models/attendanceDB");

const getAttendance = async (req, res, next) => {
  let attendances;
  try {
    attendances = await Attendance.find();
  } catch (err) {
    console.log("couldnt");
    res.status(404).send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    attendances: attendances.map((attendances) =>
      attendances.toObject({ getters: true })
    ),
  });
};

const takeAttendance = async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const {
        attendanceId,
        attendanceDate,
        attendanceStatus,
        attainingTeacher,
        grade,
        section,
      } = req.body[i];
      const attendance = new Attendance({
        attendanceId: attendanceId,
        attendanceDate: attendanceDate,
        attendanceStatus: attendanceStatus,
        attainingTeacher: attainingTeacher,
        grade: grade,
        section: section,
      });
      const existingAttendance = await Attendance.findOne({
        attendanceId: attendanceId,
        attendanceDate: attendanceDate,
      });

      if (!existingAttendance) {
        await attendance.save();
        // res
        //   .status(201)
        //   .json({ attendance: attendance.toObject({ getters: true }) });
        continue;
      }

      await Attendance.replaceOne(
        { attendanceId: attendanceId, attendanceDate: attendanceDate },
        {
          attendanceId: attendanceId,
          attendanceDate: attendanceDate,
          attendanceStatus: attendanceStatus,
          attainingTeacher: attainingTeacher,
          grade: grade,
          section: section,
        }
      );
    }
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

exports.getAttendance = getAttendance;
exports.takeAttendance = takeAttendance;

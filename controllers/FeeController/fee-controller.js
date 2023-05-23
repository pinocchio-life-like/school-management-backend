const HttpError = require("../../models/http-error");
const CalenderYear = require("../../models/calenderYearListDB");
const Fee = require("../../models/feeDB");

const getFees = async (req, res, next) => {
  let fees;
  try {
    fees = await Fee.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    fees: fees.map((fees) => fees.toObject({ getters: true })),
  });
};

const deleteFees = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Fee.deleteOne({ feeId: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete Fee", 404));
  }
};

const registerFees = async (req, res, next) => {
  const {
    key,
    feeName,
    feeType,
    feeStartDate,
    feeDueDate,
    amount,
    fineAmount,
  } = req.body;

  const students = await CalenderYear.find();

  const studentsList = [];
  for (let i = 0; i < students[0].studentsId.length; i++) {
    studentsList.push({
      studentId: students[0].studentsId[i],
      paymentStatus: "Not Paid",
      fine: 0,
      total: 0,
      due: "",
      paymentMode: "",
      payedDate: "",
      paymentId: "",
    });
  }
  const fees = new Fee({
    feeId: key,
    feeName: feeName,
    feeType: feeType,
    feeStartDate: feeStartDate,
    feeDueDate: feeDueDate,
    amount: amount,
    fineAmount: fineAmount,
    studentsList: studentsList,
  });

  try {
    const existingFee = await Fee.findOne({
      feeId: key,
    });

    if (!existingFee) {
      await fees.save();
      res.status(201).json({ fees: fees.toObject({ getters: true }) });
      return;
    }

    await Fee.replaceOne(
      { feeId: key },
      {
        feeId: key,
        feeName: feeName,
        feeType: feeType,
        feeStartDate: feeStartDate,
        feeDueDate: feeDueDate,
        amount: amount,
        fineAmount: fineAmount,
        studentsList: studentsList,
      }
    );
    res.status(201).json({ fees: fees });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

const collectFee = async (req, res, next) => {
  const {
    feeId,
    studentId,
    paymentStatus,
    fine,
    total,
    due,
    payedDate,
    paymentId,
    paymentMode,
  } = req.body;
  try {
    await Fee.updateOne(
      {
        feeId: feeId,
        "studentsList.studentId": studentId,
      },
      {
        $set: {
          "studentsList.$.paymentStatus": paymentStatus,
          "studentsList.$.fine": fine,
          "studentsList.$.total": total,
          "studentsList.$.due": due,
          "studentsList.$.paymentMode": paymentMode,
          "studentsList.$.payedDate": payedDate,
          "studentsList.$.paymentId": paymentId,
        },
      }
    );
    res.status(201).json({ updated: "successful" });
  } catch (err) {
    res.send(new HttpError("Couldnt Update Fee", 404));
  }
};

const addStudentToFee = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const studentId = req.params.id;
    const studentPaymentStatus = "Not Paid";
    const studentFineAmount = 0;
    const studentTotal = 0;
    const studentDue = "";
    const studentPaymentMode = "";
    const studentPayedDate = "";
    const studentPaymentId = "";

    const filter = {
      studentsList: { $not: { $elemMatch: { studentId: studentId } } },
    };
    const update = {
      $addToSet: {
        studentsList: {
          studentId: studentId,
          paymentStatus: studentPaymentStatus,
          fine: studentFineAmount,
          total: studentTotal,
          due: studentDue,
          paymentMode: studentPaymentMode,
          payedDate: studentPayedDate,
          paymentId: studentPaymentId,
        },
      },
    };

    await Fee.updateMany(filter, update);
    res.status(201).json({ added: "successful" });
  } catch (err) {
    res.send(new HttpError("Couldnt Add Fee", 404));
  }
};

exports.getFees = getFees;
exports.deleteFees = deleteFees;
exports.collectFee = collectFee;
exports.addStudentToFee = addStudentToFee;
exports.registerFees = registerFees;

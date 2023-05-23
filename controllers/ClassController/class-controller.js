const HttpError = require("../../models/http-error");
const Class = require("../../models/classDB");

const getClasses = async (req, res, next) => {
  let classes;
  try {
    classes = await Class.find();
  } catch (err) {
    res.send(new HttpError("Check your Internet Connection", 404));
    return;
  }
  res.status(201).json({
    classes: classes.map((classes) => classes.toObject({ getters: true })),
  });
};

const deleteClasses = async (req, res, next) => {
  try {
    await Class.deleteOne({ _id: req.params.id });
    res.status(201).json({ deleted: "successfull" });
  } catch (err) {
    res.send(new HttpError("Couldnt delete class", 404));
  }
};

const registerClasses = async (req, res, next) => {
  const { grade, section } = req.body;
  const classes = new Class({
    grade: grade,
    section: section,
  });

  try {
    const existingClass = await Class.findOne({
      grade: grade,
    });

    if (!existingClass) {
      await classes.save();
      res.status(201).json({ classes: classes.toObject({ getters: true }) });
      return;
    }

    await Class.replaceOne(
      { grade: grade },
      {
        grade: grade,
        section: section,
      }
    );
    res.status(201).json({ classes: classes });
  } catch (err) {
    res.send(new HttpError("Couldnt Offer Courses", 404));
  }
};

exports.getClasses = getClasses;
exports.deleteClasses = deleteClasses;
exports.registerClasses = registerClasses;

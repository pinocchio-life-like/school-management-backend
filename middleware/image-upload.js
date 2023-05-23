const multer = require("multer");
const { v1: uuid } = require("uuid");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads/studentsImage");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuid() + "." + ext);
  },
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});
const imageUpload = multer({ limits: 52428800, storage: storage });

module.exports = imageUpload;

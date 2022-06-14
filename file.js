const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({ storage: fileStorageEngine });

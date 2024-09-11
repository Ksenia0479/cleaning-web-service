const multer = require("multer");
const _ = require("lodash");

const upload = multer({
  limits: { fieldSize: 500000 },
  fileFilter(req, file, cb) {
    file = _.toLower(file.originalname);
    if (
      !(
        _.endsWith(file, ".jpg") ||
        _.endsWith(file, ".jpeg") ||
        _.endsWith(file, ".png")
      )
    ) {
      return cb(new Error("Supports only png, jpeg or jpg file formats!"));
    }
    cb(null, true);
  }
});

module.exports = upload;

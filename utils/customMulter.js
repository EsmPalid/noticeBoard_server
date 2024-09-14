import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname} - ${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

export default upload;

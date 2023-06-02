import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("src", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, 'data.csv');
  },
});

export const multerConfig: multer.Options = {
  dest: "/tmp",
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv")
      cb(new Error("Only file format allowed is CSV"));
    cb(null, true);
  },
};

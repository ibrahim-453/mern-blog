import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

export const uploadDir = path.join(process.cwd(), "public/images/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, bytes) => {
      if (err) return cb(err);
      const filename = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage });
export default upload;

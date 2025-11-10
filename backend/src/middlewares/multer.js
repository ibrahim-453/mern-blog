// import multer from 'multer'
// import crypto from 'crypto'
// import path from 'path'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,("./public/images/uploads"))
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12,(err,bytes)=>{
//         const fs = bytes.toString("hex")+path.extname(file.originalname)
//         cb(null,fs)
//     })
//   }
// })

// const upload = multer({ storage: storage })

// export default upload

// upload.js
import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

// Ensure the uploads folder exists
export const uploadDir = path.join(process.cwd(), "public/images/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
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

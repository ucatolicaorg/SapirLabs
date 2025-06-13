// upload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

// Storage correcto: filename completo
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

function fileFilter(req, file, cb) {
  if (path.extname(file.originalname).toLowerCase() !== ".pdf" ||
      file.mimetype !== "application/pdf") {
    return cb(new Error("Solo PDFs permitidos"), false);
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 16 * 1024 * 1024 }
});

export const verifyMagic = async (req, res, next) => {
  if (!req.file) return next();
  const buffer = fs.readFileSync(req.file.path);
  const type = await fileTypeFromBuffer(buffer);
  if (!type || type.mime !== "application/pdf") {
    fs.unlinkSync(req.file.path);
    const err = new Error("El contenido no es un PDF válido");
    err.status = 400;
    return next(err);
  }
  next();
};

import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config/index.js";
import { unlink } from "fs/promises";

//Allowed image mime types
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Multer storage (on disk) configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// File validation
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Invalid file type. Only JPEG, PNG and WEBP are allowed."),
    );
  }

  cb(null, true);
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 5, // Maximum 5 files
  },
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// Upload file to Cloudinary
const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
    });

    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  } finally {
    await unlink(file.path).catch((error) =>
      console.log("Cloudinary upload failed", error),
    );
  }
};

const deleteFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
  deleteFromCloudinary,
};

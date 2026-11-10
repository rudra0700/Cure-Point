import { type Request } from "express";
import bcrypt from "bcryptjs";
import config from "../../../config/index.js";
import {
  UserRole,
} from "../../../../generated/prisma/client.js";
import { prisma } from "../../../lib/prisma.js";
import { fileUploader } from "../../helpers/fileUpload.js";

const createPatient = async (req: Request) => {
  let uploadedImagePublicId: string | undefined;

  try {
    if (req.file) {
      const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
      req.body.patient.profilePhoto = uploadedResult?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(config.jwt.salt_round),
    );

    const result = await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          email: req.body.patient.email,
          password: hashedPassword,
        },
      });

      return await tx.patient.create({
        data: req.body.patient,
      });
    });
    return result;
  } catch (error) {
    // Delete uploaded image if database operation fails
    if (uploadedImagePublicId) {
      try {
        await fileUploader.deleteFromCloudinary(uploadedImagePublicId);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError);
      }
    }

    throw error;
  }
};

const createAdmin = async (req: Request) => {
  let uploadedImagePublicId: string | undefined;

  try {
    //upload image
    if (req.file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(
        req.file,
      );
      req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
      uploadedImagePublicId = uploadToCloudinary?.public_id;
    }

    const hashedPassword: string = await bcrypt.hash(
      req.body.password,
      Number(config.jwt.salt_round),
    );

    const userData = {
      email: req.body.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: userData,
      });

      const createdAdminData = await tx.admin.create({
        data: req.body.admin,
      });

      return createdAdminData;
    });
    return result;
  } catch (error) {
    // Delete uploaded image if database operation fails
    if (uploadedImagePublicId) {
      try {
        await fileUploader.deleteFromCloudinary(uploadedImagePublicId);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError);
      }
    }

    throw error;
  }
};

const createDoctor = async (req: Request) => {
  let uploadedImagePublicId: string | undefined;

  try {
    // upload image
    if (req.file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(
        req.file,
      );
      req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

    const userData = {
      email: req.body.doctor.email,
      password: hashedPassword,
      role: UserRole.DOCTOR,
    };

  

    const result = await prisma.$transaction(async (transactionClient) => {
      // Step 1: Create user
      await transactionClient.user.create({
        data: userData,
      });

      // Step 2: Create doctor
      const createdDoctorData = await transactionClient.doctor.create({
        data: req.body.doctor,
      });
   
      return createdDoctorData;

    });

    return result;
  } catch (error) {
    // Delete uploaded image if database operation fails
    if (uploadedImagePublicId) {
      try {
        await fileUploader.deleteFromCloudinary(uploadedImagePublicId);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError);
      }
    }

    throw error;
  }
};

// service function without pick function.
// const getAllUserFromDB = async ({page, limit, searchTerm, sortBy, sortOrder, role, status} : {page: number, limit: number, searchTerm?: any, sortBy?: any, sortOrder?:any, role?: any, status?: any}) => {
//   const pageNumber = page || 1;  // must use default value for page, otherwise wont find data or will face error
//   const limitNumber = limit || 10;  // must use default value for limit, otherwise wont find data or will face error

//   const skip =  (pageNumber - 1) * limitNumber;
//   const result = await prisma.user.findMany({
// pagination
//     skip,
//     take: limitNumber,
//     where: {
//       //search
// if we search like this , this will automatically using AND condition over email and role field for searching.
//       email : {
//         contains : searchTerm,
//         mode: "insensitive"
//       },
//       role : {
//         contains : searchTerm,
//         mode: "insensitive"
//       },
//       // filter
//       role: role,
//       status: status
//     },
//     // sorting
//     orderBy : sortBy && sortOrder ? {
//       [sortBy] : sortOrder
//     } : {
//       createdAt : "asc"
//     }
//   });
//   return result;
// };



export const UserServices = {
  createPatient,
  createAdmin,
  createDoctor,
};

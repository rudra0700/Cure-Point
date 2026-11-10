import { type Request, type RequestHandler, type Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { UserServices } from "./user.services.js";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createPatient(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient Created Successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin Created successfuly!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createDoctor(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor Created successfuly!",
    data: result,
  });
});

// Controller for normal searching, filtering, pagination and sorting

// const getAllUserFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { page, limit, searchTerm, sortBy, sortOrder, role, status } =
//     req.query;
//   const result = await UserServices.getAllUserFromDB({
//     page: Number(page),
//     limit: Number(limit),
//     searchTerm,
//     sortBy,
//     sortOrder,
//   });

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "All Users Retrieved successfully!",
//     data: result,
//   });
// });

// Controller using pick function

export const UserController = {
  createPatient,
  createAdmin,
  createDoctor,
};

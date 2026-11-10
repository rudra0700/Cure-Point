import { type NextFunction, type Request, type Response } from "express";
import { type ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { Prisma } from "../../../generated/prisma/client.js";
import AppErrors from "../errors/appErrors.js";
import multer from "multer";

const globalErrorHandlers: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation error";

    error = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  // Multer file upload error
  else if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size cannot exceed 5 MB.",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "You can upload a maximum of 5 files.",
      });
    }
  }
  // Coustom application error
  else if (err instanceof AppErrors) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Prisma known request errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate key error";
      statusCode = httpStatus.CONFLICT;
    } else if (err.code === "P1000") {
      message = "Authentication failed at database server";
      statusCode = httpStatus.BAD_GATEWAY;
    } else if (err.code === "P2003") {
      message = "Foreign key constraint failed";
      statusCode = httpStatus.BAD_REQUEST;
    }
  }
  // Prisma validation errors
  else if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Prisma validation error";
    error = err.message;
    statusCode = httpStatus.BAD_REQUEST;
  }
  //  Prisma unknown request errors
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    message = "Unknown Prisma error occurred";
    error = err.message;
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }
  // Prisma initialization errors
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    message = "Prisma client failed to initialize";
    error = err.message;
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  } else if (err instanceof Error) {
    message = "Internal server error";
  }

  res.status(statusCode).json({
    statusCode,
    success,
    message,
    error,
  });
};

export default globalErrorHandlers;

import express, {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { UserRole } from "../../../../generated/prisma/client.js";
import { UserController } from "./user.controller.js";
import { userValidation } from "./user.validation.js";
import { fileUploader } from "../../helpers/fileUpload.js";

const router: Router = express.Router();

router.post(
  "/create-patient",
  // validateRequest(userValidation.createPatientValidationSchema),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    return UserController.createPatient(req, res, next);
  },
);

router.post(
  "/create-admin",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Before parse", req.body.data);
    req.body = userValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    console.log("After parse", req.body);

    return UserController.createAdmin(req, res, next);
  },
);

router.post(
  "/create-doctor",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createDoctor(req, res, next);
  },
);

export const UserRoutes = router;

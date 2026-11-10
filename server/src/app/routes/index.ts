import express, { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
// import { UserRoutes } from "../modules/user/user.routes";
// import { AuthRoutes } from "../modules/auth/auth.routes";
// import { ScheduleRoutes } from "../modules/schedule/schedule.routes";
// import { doctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";
// import { SpecialtiesRoutes } from "../modules/specialities/specialities.routes";
// import { DoctorRoutes } from "../modules/doctors/doctors.routes";
// import { AppointmentRoutes } from "../modules/appointment/appointment.routes";
// import { PrescriptionRoutes } from "../modules/prescription/prescription.routes";
// import { ReviewRoutes } from "../modules/review/review.routes";
// import { PatientRoutes } from "../modules/patient/patient.routes";
// import { MetaRoutes } from "../modules/meta/meta.routes";
// import { AdminRoutes } from "../modules/admin/admin.routes";

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  //   {
  //     path: "/auth",
  //     route: AuthRoutes,
  //   },
  //   {
  //     path: "/schedule",
  //     route: ScheduleRoutes,
  //   },
  //   {
  //     path: "/doctor-schedule",
  //     route: doctorScheduleRoutes,
  //   },
  //   {
  //     path: "/specialities",
  //     route: SpecialtiesRoutes,
  //   },
  //   {
  //     path: "/admin",
  //     route: AdminRoutes,
  //   },
  //   {
  //     path: "/doctor",
  //     route: DoctorRoutes,
  //   },
  //   {
  //     path: "/patient",
  //     route: PatientRoutes,
  //   },
  //   {
  //     path: "/appointment",
  //     route: AppointmentRoutes,
  //   },
  //   {
  //     path: "/prescription",
  //     route: PrescriptionRoutes,
  //   },
  //   {
  //     path: "/review",
  //     route: ReviewRoutes,
  //   },
  //   {
  //     path: "/meta",
  //     route: MetaRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

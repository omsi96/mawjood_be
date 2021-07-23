import adminBroRoute from "./admin/adminBro";
import authRouter from "./auth/auth.router";
import express from "express";
import subjectRouter from "./subject/subject.router";
import studentRouter from "./student/student.router";
import classRouter from "./class/class.router";
import attendanceRouter from "./attendance/attendance.router";

const routers = express.Router();

routers.use("/account", authRouter);
routers.use("/admin", adminBroRoute);
routers.use("/subject", subjectRouter);
routers.use("/student", studentRouter);
routers.use("/class", classRouter);
routers.use("/attendance", attendanceRouter);

export default routers;

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import express from "express";
import { Subject } from "../../db/models";
import { getSubjectDetails, addStudentToSubject } from "./subject.controller";
const router = express.Router();

const controllers = new CrudController(Subject, "subjects");
const routers = new CrudRouter(controllers);
router.use("/", routers);
router.get("/:subjectId", getSubjectDetails);
router.post("/:subjectId/addstudent", addStudentToSubject);
export default router;

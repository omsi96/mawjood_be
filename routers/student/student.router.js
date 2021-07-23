import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import express from "express";
import { Student } from "../../db/models";
const router = express.Router();

const controllers = new CrudController(Student, "students");
const routers = new CrudRouter(controllers);
router.use("/", routers);
export default router;

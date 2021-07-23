import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Lesson } from "../../db/models";
import { injectItemSlugInBody } from "./middleware";
import { getLessonsForCourse } from "./controller";
import express from "express";

const router = express.Router();

const lessonController = new CrudController(Lesson, "lessons");
const lessonRouter = new CrudRouter(lessonController, {
  listMW: [getLessonsForCourse],
});

router.use("/course/:itemSlug/lessons", injectItemSlugInBody, lessonRouter);
router.use(lessonRouter);

export default router;

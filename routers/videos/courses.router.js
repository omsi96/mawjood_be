import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Course, Track, Lesson, Video } from "../../db/models";
import express from "express";
import { updateCourseIfExists } from "./middleware";

const listAllOptions = {
  order: [["position", "ASC"]],
  include: [
    {
      model: Track,
      as: "track",
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
    {
      model: Lesson,
      as: "lessons",
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Video,
          as: "videos",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    },
  ],
};

const router = express.Router();
const controller = new CrudController(Course, "course", listAllOptions);
const routers = new CrudRouter(controller, {
  createMW: [updateCourseIfExists],
});
router.use(routers);

export default router;

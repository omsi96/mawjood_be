import { isMentor, isSignedIn } from "../../middleware/permissions";
import {
  getStudentsSubmissionForTask,
  getTasksForTrack,
  getTasksSubmissionsForTrack,
  getTasksWithSubmissionsForTrack,
} from "./tasks.controller";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Task } from "../../db/models";
import express from "express";
import { injectTrackIdInBody } from "./tasks.middleware";

const router = express.Router();
const mentorsPermission = [isSignedIn, isMentor];

const tasksListOptions = {};

const taskController = new CrudController(Task, "task", tasksListOptions);
const taskRouter = new CrudRouter(taskController, {
  listMW: [getTasksForTrack],
  createMW: [mentorsPermission],
  updateMW: [mentorsPermission],
  destroyMW: [mentorsPermission],
});
router.use(
  "/track/:trackId/tasks",
  // mentorsPermission,
  injectTrackIdInBody,
  taskRouter
);

router.get(
  "/track/:trackId/tasks/submissions",
  isSignedIn,
  getTasksWithSubmissionsForTrack
);
router.get("/track/:trackId/tasks", isSignedIn, getTasksForTrack);
// This router takes a query. You can filter the responses to a specific student
router.get("/tasks/:taskId/", mentorsPermission, getTasksSubmissionsForTrack);
// This router takes a query. You can filter the responses to a specific submission
router.get(
  "/students/:studentId/submissions",
  mentorsPermission,
  getStudentsSubmissionForTask
);
export default router;

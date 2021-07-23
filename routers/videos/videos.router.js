import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Video } from "../../db/models";
import { injectItemIdInBody } from "./middleware";
import {
  getLessonsForVideo,
  getAllVideos,
  getAllCoursesOfTrack,
} from "./controller";
import express from "express";

const router = express.Router();

const videoController = new CrudController(Video, "video");
const videoRouter = new CrudRouter(videoController, {
  listMW: [getLessonsForVideo],
});
//the item id is the lesson id, it's called item so it can be used in more than one place
router.use("/lessons/:itemId/videos", injectItemIdInBody, videoRouter);
router.use("/videos", getAllVideos);
router.use("/allcourses/:trackId", getAllCoursesOfTrack);

export default router;

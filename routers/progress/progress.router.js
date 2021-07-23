import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Progress, Video, Profile } from "../../db/models";
import { getProgressByProfileID, getVideoByID } from "./progress.controller";
import express from "express";
import { injectIdsInBody } from "./progress.middleware";

const listOptions = {};
// {

// attributes: {
//   exclude: ["createdAt", "updatedAt"],
// },
// include: [
//   {
//     model: Video,
//     as: "video",
//     attributes: { exclude: ["createdAt", "updatedAt"] },
//   },
//   {
//     model: Profile,
//     as: "profile",
//     attributes: { exclude: ["createdAt", "updatedAt"] },
//   },
// ],
// };

const router = express.Router();
const controller = new CrudController(Progress, "progress");
const routers = new CrudRouter(controller);

router.get("/progress/:profileId/:videoId/", getVideoByID);
router.use("/progress/:profileId/:videoId/", routers);
router.get("/user/progress/:profileId/", getProgressByProfileID);

export default router;

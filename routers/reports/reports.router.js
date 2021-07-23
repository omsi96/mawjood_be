import { disabled, isSignedIn, isMentor } from "../../middleware/permissions";
import {
  getSubmissionsCountOnTasksForTrack,
  getSubmissionsCountOnTasksForStudent,
  getFullReportOnTrack,
} from "./reports.controller";
import express from "express";
const router = express.Router();

router.get(
  "/track/:trackId",
  isSignedIn,
  isMentor,
  // getSubmissionsCountOnTasksForTrack
  getFullReportOnTrack
);
router.get(
  "/students/:studentId",
  isSignedIn,
  isMentor,
  getSubmissionsCountOnTasksForStudent
);

export default router;

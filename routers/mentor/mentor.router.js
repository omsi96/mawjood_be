import express from "express";
import { isSignedIn } from "../../middleware/permissions";
import { injectTrackId } from "./mentor.middleware";
import { getMentors } from "./mentor.controller";

const router = express.Router();

router.get("/", isSignedIn, injectTrackId, getMentors);

export default router;

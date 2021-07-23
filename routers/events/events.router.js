import { getEvents } from "./events.controller";
import { isSignedIn } from "../../middleware/permissions";
import { injectTrackId } from "../mentor/mentor.middleware";
import express from "express";

const router = express.Router();
router.get("/events", isSignedIn, injectTrackId, getEvents);
export default router;

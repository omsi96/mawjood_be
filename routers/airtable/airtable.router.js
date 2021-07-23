import express from "express";
import { isMentor, isSignedIn } from "../../middleware/permissions";
import airtableMigrate from "./airtable.controller";
const router = express.Router();

router.post("/", airtableMigrate);

export default router;

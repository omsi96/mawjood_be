import { Comment } from "../../../db/models";
import {
  disabled,
  isSignedIn,
  isMentor,
} from "../../../middleware/permissions";
import CrudController from "../../../crud/crud.controller";
import CrudRouter from "../../../crud/crud.router";
import express from "express";
import { listNotes, createComment } from "./comment.controller";
import { injectUpdatedBy } from "./comment.middleware";

const router = express.Router();
router.use(
  new CrudRouter(new CrudController(Comment, "Comment"), {
    updateMW: [disabled],
    createMW: [createComment],
    destroyMW: [],
    listMW: [listNotes],
  })
);

export default router;

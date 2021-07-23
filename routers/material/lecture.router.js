import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Lecture } from "../../db/models";
import { Material } from "../../db/models";
import express from "express";

const listAllOptions = {
  include: [
    {
      model: Material,
      as: "material",
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  ],
};

const router = express.Router();
const controller = new CrudController(Lecture, "lecture", listAllOptions);
const routers = new CrudRouter(controller);
router.use(routers);

export default router;

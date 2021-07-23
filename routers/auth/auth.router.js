const express = require("express");
const router = express.Router();
const { createUser, signIn, me } = require("./auth.controller");
const passport = require("passport");
import { isSignedIn } from "../../middleware/permissions";
const signInPassportMiddleware = passport.authenticate("local", {
  session: false,
});

router.post("/register", createUser);
router.post("/login", signInPassportMiddleware, signIn);
router.get("/me", isSignedIn, me);

module.exports = router;

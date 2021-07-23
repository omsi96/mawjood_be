import adminBroRoute from "./admin/adminBro";
import authRouter from "./auth/auth.router";
import express from "express";
import lectureRouter from "./material/lecture.router";
import materialRouter from "./material/material.router";
import profileRouter from "./profile/profile.router";
import studentsRouter from "./student/student.router";
import submissionRouter from "./submission/submission.router";
import tasksRouter from "./tasks/tasks.router";
import trackRouter from "./track/track.router";
import eventRouter from "./events/events.router";
import reportsRouter from "./reports/reports.router";
import mentorsRouter from "./mentor/mentor.router";
import discordRouter from "./discord/discord.router";
import lessonsRouter from "./videos/lesson.router";
import videosRouter from "./videos/videos.router";
import courseRouter from "./videos/courses.router";
import progressRouter from "./progress/progress.router";
import airtableRouter from "./airtable/airtable.router";
import subjectRouter from "./subject/subject.router";

const routers = express.Router();

routers.use("/account", authRouter);
routers.use("/admin", adminBroRoute);
routers.use("/subject", subjectRouter);
// routers.use("/profile", profileRouter);
// routers.use("/students", studentsRouter);
// routers.use("/lectures", lectureRouter);
// routers.use("/material", materialRouter);
// routers.use("/tracks", trackRouter);
// routers.use("/reports", reportsRouter);
// routers.use("/mentors", mentorsRouter);
// routers.use("/discord", discordRouter);
// routers.use(lessonsRouter);
// routers.use(submissionRouter);
// routers.use(tasksRouter);
// routers.use(eventRouter);
// routers.use(videosRouter);
// routers.use("/courses", courseRouter);
// routers.use(progressRouter);
// routers.use("/migrate", airtableRouter);

export default routers;
import handleLessons from "./handleLessons";
import handleCourses from "./handleCourses";
import handleVideos from "./handleVideos";

export default async function migrateDB(courses, lessons, videos) {
  await handleCourses(courses);
  await handleLessons(lessons);
  await handleVideos(videos);
  console.log("Database synced successfully!");
}

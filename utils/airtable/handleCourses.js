import { Track, Course } from "../../db/models";
import { updateOrCreateCourse } from "./updateOrCreate";

const findTrack = async (trackName) => {
  const track = await Track.findOne({
    where: { name: trackName },
  });
  return track.id;
};

const handleCourses = async (courses) => {
  courses.forEach(
    // * this methods creates or updates a course if it was on airtable but not on database
    async (course, position) => {
      const trackId = await findTrack(course.track);
      updateOrCreateCourse({
        id: course.id,
        title: course.title,
        description: course.description,
        coverImage: course.coverImage,
        trackId,
        position,
      });
    }
  );

  deleteCourses(courses);
};

// ? this methods deletes a course if it was in our database but not on airtable
const deleteCourses = async (coursesAirtable) => {
  const coursesDB = await Course.findAll();

  const deletedCourses = coursesDB.filter(
    ({ id: idOfRealDB }) =>
      !coursesAirtable.some(
        ({ id: idOfAirtable }) => idOfAirtable === idOfRealDB
      )
  );

  deletedCourses.forEach(async (course) => {
    await Course.destroy({
      where: { id: course.id },
    });
  });

  return deletedCourses;
};

export default handleCourses;

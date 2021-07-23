import { Lesson } from "../../db/models";
import { updateOrCreateLesson } from "./updateOrCreate";

function deepCompareLessonWithDBLesson(lesson, foundObjectDB) {
  const comparison =
    JSON.stringify({
      title: foundObjectDB.title,
      description: foundObjectDB.description,
      courseId: foundObjectDB.courseId,
    }) ===
    JSON.stringify({
      title: lesson.title,
      description: lesson.description,
      courseId: lesson.courseId,
    });

  return comparison;
}

const handleLessons = async (lessonsAirtable) => {
  // getting the lessons from the real database
  const lessonsDB = await Lesson.findAll();
  deleteLessons(lessonsDB, lessonsAirtable);

  // ? this loop iterates through all airtable lessons and it first tries to find the object in the real database
  // ? if it's not found it creates it, if it's found it checks if it needs updatind or not
  lessonsAirtable.forEach((lesson) => {
    //   this is the found object with the same airtable id in the real database, if found
    const foundObject = lessonsDB.find((x) => x.id === lesson.id);
    let foundObjectDB;
    if (foundObject) {
      foundObjectDB = foundObject.dataValues;
    }

    //if not found, it creates it
    if (!foundObject) {
      updateOrCreateLesson({
        title: lesson.title,
        description: lesson.description,
        courseId: lesson.courseId,
        id: lesson.id,
      });
    } else {
      if (deepCompareLessonWithDBLesson(lesson, foundObjectDB) == false) {
        updateOrCreateLesson(lesson);
      }
    }
  });
};

// ? this function deletes a lesson if it was in the local database but not on airtable
const deleteLessons = (lessonsDB, lessonsAirtable) => {
  // lessonsToBeDeleted are the lessons existing in the database but not on airtable
  const lessonsToBeDeleted = lessonsDB.filter(
    ({ id: idOfRealDB }) =>
      !lessonsAirtable.some(
        ({ id: idOfAirtable }) => idOfAirtable === idOfRealDB
      )
  );

  lessonsToBeDeleted.forEach(async (lesson) => {
    await Lesson.destroy({
      where: { id: lesson.id },
    });
  });
};

export default handleLessons;

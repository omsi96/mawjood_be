import { Course, Lesson, Video } from "../../db/models";
import { UniqueConstraintError } from "sequelize";
export const updateOrCreateCourse = async (data, res, next) => {
  try {
    const { id } = data;
    const course = await Course.findOne({
      where: {
        id: id,
      },
    });

    if (course) {
      await course.update(data);
    } else {
      await Course.create(data);
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: updateOrCreate.js ~ line 33 ~ updateOrCreate ~ error",
      error
    );
  }
};

// lesson
export const updateOrCreateLesson = async (data) => {
  try {
    const { id } = data;
    const lesson = await Lesson.findOne({
      where: {
        id: id,
      },
    });

    if (lesson) {
      await lesson.update(data);
    } else {
      await Lesson.create(data);
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: updateOrCreate.js ~ line 33 ~ updateOrCreate ~ error",
      error
    );
  }
};

// video
export const updateOrCreateVideo = async (data) => {
  try {
    const { airtableId } = data;
    const video = await Video.findOne({
      where: {
        airtableId: airtableId,
      },
    });

    if (video) {
      await video.update(data);
    } else {
      await Video.create(data);
    }
  } catch (error) {
    try {
      if (error instanceof UniqueConstraintError) {
        await Video.create({ ...data, slug: `video${data.airtableId}` });
      }
    } catch (error2) {
      console.log("error 2", error2);
    }
  }
  //   console.log(
  //     "🚀 ~ file: updateOrCreate.js ~ line 33 ~ updateOrCreate ~ error",
  //     error
  //   );
  // }
};

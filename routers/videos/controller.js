import { Video, Lesson, Course, Track } from "../../db/models";

//I need this
//gets all lessons in a course and all their videos
export const getLessonsForCourse = async (req, res, next) => {
  try {
    const lessons = await Course.findOne({
      where: { slug: req.body.itemSlug },
      attributes: ["id", "title", "slug"],
      include: [
        {
          model: Track,
          as: "track",
          attributes: ["name", "slug"],
        },
        {
          model: Lesson,
          as: "lessons",
          include: {
            model: Video,
            as: "videos",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        },
      ],
    });
    //or find one
    res.json(lessons);
    // res.json(lessons[0]);
  } catch (error) {
    next(error);
  }
};

//I need this request to fetch all courses of a track, their lessons, and videos
export const getAllCoursesOfTrack = async (req, res, next) => {
  try {
    const data = await Course.findAll({
      where: { trackId: req.params.trackId },
      include: [
        {
          model: Lesson,
          as: "lessons",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Video,
              as: "videos",
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

//I don't need this request
//gets all lessons associated with a video
export const getLessonsForVideo = async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      where: { lessonId: req.body.itemId },
      include: [
        {
          model: Lesson,
          as: "lesson",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

//I don't need this request
//gets all videos and all associations
export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      include: [
        {
          model: Lesson,
          as: "lesson",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Course,
              as: "course",
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                {
                  model: Track,
                  as: "track",
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

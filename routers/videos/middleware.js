import { Course } from "../../db/models";

export const injectItemIdInBody = async (req, res, next) => {
  try {
    req.body.itemId = req.params.itemId;
    next();
  } catch (error) {
    next(error);
  }
};

export const injectItemSlugInBody = async (req, res, next) => {
  try {
    req.body.itemSlug = req.params.itemSlug;
    next();
  } catch (error) {
    next(error);
  }
};

//

export const updateCourseIfExists = async (req, res, next) => {
  try {
    const { id } = req.body;
    const course = await Course.findOne({
      where: {
        id,
      },
    });

    if (course) {
      await course.update(req.body);
      // const progress = await updateStudentProgress(studentId);
      res.status(202).json({
        message: "Updated!",
        payload: { ...JSON.parse(JSON.stringify(course)) },
      });
    } else {
      const newCourse = await Course.create(req.body);
      // const progress = await updateStudentProgress(studentId);
      res.status(201).json({
        message: "Created!",
        payload: { ...JSON.parse(JSON.stringify(newCourse)) },
      });
    }
  } catch (error) {
    next(error);
  }
};

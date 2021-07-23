import { Student, Submission, Task, Track } from "../../db/models";

// This should show tasks for cohort_track
export const getTasksForTrack = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { trackId: req.body.trackId },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTasksSubmissionsForTrack = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const submissions = await Submission.findAll({
      where: {
        taskId,
        ...req.query,
      },
    });
    res.json(submissions);
  } catch (error) {
    next(error);
  }
};
export const getTasksSubmissionsForTrack_old = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const tasks = await Task.findByPk(taskId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      required: true,
      include: [
        {
          model: Submission,
          as: "submissions",
          where: { ...req.query },
          required: true,
        },
      ],
    });
    if (!tasks) {
      next({ message: "Not found!", status: 404 });
      return;
    }
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getStudentsSubmissionForTask = async (req, res, next) => {
  const { studentId } = req.params;
  const query = req.query;
  try {
    const submissions = await Submission.findAll({
      where: {
        studentId,
        ...query,
      },
    });
    if (!submissions) {
      next({ message: "Not found!", status: 404 });
      return;
    }
    res.json(submissions);
  } catch (error) {
    next(error);
  }
};
export const getTasksWithSubmissionsForTrack = async (req, res, next) => {
  try {
    const tasks = await Track.findByPk(req.body.trackId, {
      include: [
        {
          model: Task,
          as: "tasks",
          include: [
            {
              model: Student,
              attributes: ["id"],
            },
          ],
          // through: { attributes: ["createdAt"] },
        },
      ],
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

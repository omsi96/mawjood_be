import { Profile, Student, Task, Track, User, Comment } from "../../db/models";
import {
  averageNowRequiredScore,
  averageScore,
  numberOfDoneTasksWithType,
  weightedScores,
} from "../tasks/progress.helper";

// testing submission
export const getStudentProgress = async (req, res, next) => {
  try {
    // res.send("Yooo");
    const studentId = req.params.studentId;
    console.log("sids", studentId);
    const student = await Student.findByPk(studentId, {
      attributes: { exclude: ["updatedAt", "createdAt"] },

      include: [
        // COMMENTS
        {
          model: Comment,
          as: "comments",
          // attributes: { exclude: ["studentId"] },
        },
        {
          model: Profile,
          as: "profile",
          attributes: ["name", "image", "bio", "enrolled"],

          include: [
            {
              model: User,
              as: "user",
              attributes: ["email"],
            },
          ],
        },
      ],
    });

    if (!student.trackId) {
      const error = new Error("Student must be assigned to a track");
      error.status = 400;
      next(error);
    }

    const tasks = await Task.findAll({
      where: {
        trackId: student.trackId,
      },
      include: {
        required: false,
        model: Student,
        attributes: ["id"],
        where: {
          id: studentId,
        },
      },
    });
    let studentJSON = JSON.parse(JSON.stringify(student));
    let tasksJSON = JSON.parse(JSON.stringify(tasks));
    tasksJSON.forEach((task) => {
      task.submission = task.Students[0]?.Submission;
      delete task.Students;
    });

    let progress = {
      averageCourse: averageScore(tasksJSON),
      averageRequiredScore: averageNowRequiredScore(tasksJSON),
      doneClasswork: numberOfDoneTasksWithType(tasksJSON, "Classwork"),
      doneHomework: numberOfDoneTasksWithType(tasksJSON, "Homework"),
      tasks: weightedScores(tasksJSON),
    };

    delete studentJSON.Tasks;

    res.json({ ...studentJSON, progress });
  } catch (error) {
    next(error);
  }
};

export const testingStudnetsWithTasks = async (req, res, next) => {
  const students = await Student.findAll({
    include: Task,
  });
  res.json(students);
};

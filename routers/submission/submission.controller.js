import { Submission, Student, Task } from "../../db/models";
import {
  averageNowRequiredScore,
  averageScore,
  totalScore,
} from "../tasks/progress.helper";

// This amazing middleware makes a single `post` request to create
// if there is no submission already created, or updates and existing one

export const updateSubmissionIfExists = async (req, res, next) => {
  try {
    const { taskId, studentId } = req.body;
    const submission = await Submission.findOne({
      where: {
        taskId,
        studentId,
      },
    });

    if (submission) {
      await submission.update(req.body);
      const progress = await updateStudentProgress(studentId);
      res.status(202).json({
        message: "Updated!",
        payload: { ...JSON.parse(JSON.stringify(submission)), progress },
      });
    } else {
      const newSubmission = await Submission.create(req.body);
      const progress = await updateStudentProgress(studentId);
      res.status(201).json({
        message: "Created!",
        payload: { ...JSON.parse(JSON.stringify(newSubmission)), progress },
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStudentProgress = async (studentId) => {
  const student = await Student.findOne({
    where: { id: studentId },
    include: Task,
  });
  let studentJSON = JSON.parse(JSON.stringify(student));
  studentJSON.tasks = [...studentJSON.Tasks];
  delete studentJSON.Tasks;
  studentJSON.tasks.map((s) => {
    s.submission = { ...s.Submission };
    delete s.Submission;
  });
  // res.json(studentJSON);
  const tasks = studentJSON.tasks;
  const progress = {
    totalScore: totalScore(tasks),
    averageCourseScore: averageScore(tasks),
    averageNowRequiredScore: averageNowRequiredScore(tasks),
  };
  return progress;
};
// not used
export const bulkUpdateSubmissions = async (req, res, next) => {
  try {
    Submission.bulkCreate(
      [
        { id: 1, status: "5arbooo6a", studentId: 1, taskId },
        { id: 2, status: "5arboo6a", studentId: 1 },
        { id: 3, status: "5arboo6a", studentId: 1 },
        { id: 4, status: "5arboo6a", studentId: 1 },
        { id: 5, status: "5arboo6a", studentId: 1 },
      ],
      { updateOnDuplicate: ["name"] }
    );
  } catch (error) {
    next(error);
  }
};

import { Task, User, Student, Profile, Submission } from "../../db/models";
import {
  averageNowRequiredScore,
  averageScore,
  totalScore,
} from "../tasks/progress.helper";

// we are using this api
export const getListOfStudentFromTrack = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const { studentId } = req.query;
    const students = await Student.findAll({
      where: { trackId },
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            model: User,
            as: "user",
            attributes: ["id", "email"],
          },
        },
        // Task, // this will give me tasks if students submitted anything.
      ],
    });

    const tasks = await Task.findAll({
      where: { trackId },
      include: Student,
    });
    // task.Submission.studentId
    let studentsJSON = JSON.parse(JSON.stringify(students));
    let tasksJSON = JSON.parse(JSON.stringify(tasks));

    // res.json([...tasksJSON]); // task.Students.Submission

    let studentsWithSubmissions = studentsJSON.map((student) => {
      // injected tasks to student
      student.tasks = [...tasksJSON];
      // student.tasks -> Task1.Submussions[].studentId
      student.tasks = student.tasks.map((task) => {
        const studentsWhoSubmittedThisTask = [...task.Students];
        const submissionsForAllStudentsToThisTask = studentsWhoSubmittedThisTask.map(
          (s) => {
            return s.Submission;
          }
        );
        const submission = submissionsForAllStudentsToThisTask.find(
          (s) => +s.studentId === +student.id
        );

        // single task converted into single submission
        return {
          taskId: task.id,
          weight: task.weight,
          submission,
          dueDate: task.dueDate,
          required: task.required,
        };
      });
      return student;
    });

    // Inject some prgress values
    studentsWithSubmissions = studentsWithSubmissions.map((student) => {
      return {
        ...student,
        progress: {
          totalScore: totalScore(student.tasks),
          averageCourseScore: averageScore(student.tasks),
          averageNowRequiredScore: averageNowRequiredScore(student.tasks),
        },
      };
    });

    // query thing (One api, 2 things you can get out of it. All students + a single student )
    const filteredResult = studentsWithSubmissions.find(
      (s) => +s.id === +studentId
    );

    if (studentId) {
      if (filteredResult) {
        res.json(filteredResult);
      } else {
        const error = new Error(
          `Student with studentId ${studentId} is not found!`
        );
        error.status = 404;
        next(error);
      }
    } else {
      res.json(studentsWithSubmissions);
    }
  } catch (error) {
    next(error);
  }
};

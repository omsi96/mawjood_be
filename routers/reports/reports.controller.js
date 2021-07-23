import { Op } from "sequelize";
const s = require("sequelize");

import {
  sequelize,
  Track,
  Task,
  Lecture,
  Student,
  Sequelize,
} from "../../db/models";

export const getSubmissionsCountOnTasksForTrack = async (req, res, next) => {
  const { trackId } = req.params;
  try {
    const tasks = await getSubmissionsCountOnTaskForTrackOrStudent(trackId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getFullReportOnTrack = async (req, res, next) => {
  const { trackId } = req.params;
  try {
    const tasks = await getSubmissionsCountOnTaskForTrackOrStudent(trackId);
    const track = await getTrackInformation(trackId);
    track.tasks = tasks;
    res.json(track);
  } catch (error) {
    next(error);
  }
};

// We're not using this one now. We're using the report inside the student controller
export const getSubmissionsCountOnTasksForStudent = async (req, res, next) => {
  const { trackId, studentId } = req.params;
  try {
    const tasks = await getSubmissionsCountOnTaskForTrackOrStudent(
      trackId,
      studentId
    );
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Give it a task, it will give you how many students have done this task
 */
const getTaskProgress = (task) => {
  return task.Students.reduce((acc, current) => {
    console.log("Student:", current.Submission.status);
    return acc + (current.Submission.status === "done" ? 1 : 0);
  }, 0);
};

const getSubmissionsCountOnTaskForTrackOrStudent = async (
  trackId,
  studentId
) => {
  // const [results, metadata] = await sequelize.query("SELECT id FROM Tasks");
  const tasksResponse = await Task.findAll({
    where: {
      trackId,
    },
    attributes: ["id", "title", "dueDate", "weight", "required", "type"],
    include: [
      {
        model: Student,
        required: false,
        attributes: ["id"],
        where: studentId ? { studentId } : {},
        through: {
          attributes: ["status", "score"],
        },
      },
    ],
  });

  let tasks = JSON.parse(JSON.stringify(tasksResponse));

  tasks = tasks.map((task) => {
    const progress = {
      studentsDoneTask: getTaskProgress(task),
    };

    delete task.Students;
    return { ...task, progress };
  });
  return tasks;
};
/**
 *
 * Give it a track Id, it gives you all details: classwork, homework, number of lectures left
 */
const getTrackInformation = async (trackId) => {
  const track = await Track.findByPk(trackId, {
    attributes: {
      exclude: ["updatedAt", "createdAt"],
    },

    include: [
      {
        model: Lecture,
        as: "lectures",
        attributes: { exclude: ["updatedAt", "createdAt"] },
      },
      {
        model: Student,
        as: "students",
        attributes: ["id"],
      },
      {
        model: Task,
        as: "tasks",
        attributes: ["id", "type"],
      },
    ],
  });
  let trackJSON = JSON.parse(JSON.stringify(track));
  // getting only number of students
  let numberOfStudents = trackJSON.students.reduce(
    (acc, current) => acc + 1,
    0
  );

  // getting only number of tasks
  let numberOfTasks = trackJSON.tasks.reduce((acc, current) => acc + 1, 0);
  let countTasksTypes = countOccurrences(trackJSON.tasks.map((t) => t.type));

  // getting number of lectures + number of left lectures
  const totalLectures = trackJSON.lectures.reduce((acc, current) => acc + 1, 0);
  const passedCheck = (date) => new Date() > new Date(date);
  const passedLectures = trackJSON.lectures.reduce(
    (acc, current) => acc + (passedCheck(current.date) ? 1 : 0),
    0
  );

  // get attendance report
  let attendance = trackJSON.lectures.map((lecture) => ({
    lecture: lecture.title,
    count: lecture.attendance,
    date: lecture.date,
  }));
  trackJSON = {
    ...trackJSON,
    totalLectures,
    passedLectures,
    numberOfTasks,
    numberOfStudents,
    countTasksTypes,
    attendance,
  };
  delete trackJSON.lectures;
  delete trackJSON.students;
  delete trackJSON.tasks;
  return trackJSON;
};
const countOccurrences = (arr) =>
  arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

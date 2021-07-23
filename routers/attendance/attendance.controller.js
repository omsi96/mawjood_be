import { Student, Class, StudentClass, Session } from "../../db/models";
import Server from "socket.io";

export const studentAttend = async (req, res, next) => {
  const { classSecret, studentId } = req.body;
  const session = await Session.findOne({ where: classSecret });
  const { classId } = session;
  req.classId = classId;
  req.studentId = studentId;
  await takeAttendance(req, res, next);
};

export const takeAttendance = async (req, res, next) => {
  try {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
      throw new Error("You should provide classId and studentId");
    }
    const foundStudent = await Student.findByPk(studentId);
    const foundClass = await Class.findByPk(classId);
    const foundAttended = await StudentClass.findOne({
      where: { studentId, classId },
    });
    if (foundAttended) {
      res
        .status(400)
        .json({ message: "student has already been marked as attended" });
    }
    console.log(foundClass, foundStudent);
    if (foundStudent && foundClass) {
      const attended = await StudentClass.create({
        attendanceStatus: 1,
        studentId,
        classId,
      });
      res.status(201).json({
        message: "You've been marked as attended",
        foundClass,
        foundStudent,
      });
    } else {
      // check the secret and compare with the open session
      res.status(401).json({
        message:
          "Your request is not authorized, or class or student don't exist",
      });
    }
  } catch (error) {
    console.log("***** Couldn't take attendance with error", error);
    next(error);
  }
};

export const createSession = async (req, res, next) => {
  try {
    const { classId } = req.body;
    const classSecret = Math.floor(1000 + Math.random() * 9000);
    const session = await Session.create({ classSecret, classId });
    res.json({ session });
  } catch (error) {
    next(error);
  }
};

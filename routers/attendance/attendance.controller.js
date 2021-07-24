import { User, Class, Attendance, Session } from "../../db/models";
import { io } from "socket.io-client";
let socket; // TODO: This should be an array of scokets, since there can be multiple sessions running at the same time

export const terminateSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId);
    socket.close();
    await session.destroy();

    res.end();
  } catch (error) {
    next(error);
  }
};
export const studentAttend = async (req, res, next) => {
  try {
    const { classSecret, studentId } = req.body;

    const session = await Session.findOne({ where: { classSecret } });
    const { classId } = session;

    req.body.classId = classId;
    req.body.studentId = studentId;

    console.log("Student is taking attendance, ", {
      classSecret,
      studentId,
      classId,
    });

    await takeAttendance(req, res, next);

    const student = await User.findByPk(studentId);
    socket.emit("newStudent", {
      classId,
      studentId,
      classSecret,
      name: student.name,
    });
  } catch (error) {
    next(error);
  }
};

export const takeAttendance = async (req, res, next) => {
  try {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
      throw new Error("You should provide classId and studentId");
    }
    const foundStudent = await User.findByPk(studentId);
    const foundClass = await Class.findByPk(classId);
    const foundAttended = await Attendance.findOne({
      where: { studentId, classId },
    });
    if (foundAttended) {
      res.json({
        message: "student has already been marked as attended",
        studentId,
      });
    }
    // console.log(foundClass, foundStudent);
    if (foundStudent && foundClass) {
      const attended = await Attendance.create({
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
    // SOCKET

    socket = io("http://localhost:8000", {
      reconnectionDelayMax: 10000,
      auth: { token: "123" },
      query: { "my-key": "" },
    });
  } catch (error) {
    next(error);
  }
};

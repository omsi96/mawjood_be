import { Student, Class, StudentClass } from "../../db/models";
export const takeAttendance = async (req, res, next) => {
  try {
    const { studentId, classId, classSecret } = req.body;

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
    console.log("***** Couldn't take attendnace with error", error);
    next(error);
  }
};

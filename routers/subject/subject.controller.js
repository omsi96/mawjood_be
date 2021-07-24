import { Subject, User, StudentSubject, Class } from "../../db/models";

export const getSubjectDetails = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const students = await User.findAll({
      where: {
        userType: "student",
      },
      include: {
        model: Subject,
        attributes: [],
        where: { id: subjectId },
      },
      include: {
        model: Class,
        where: { subjectId },
        attributes: ["id"],
        through: {
          attributes: [],
        },
        required: false,
        // attributes: ["id"],
      },
    });
    let jsonStudents = JSON.parse(JSON.stringify(students));
    jsonStudents = jsonStudents.map((student) => ({
      ...student,
      attendedClasses: student.Classes.length,
    }));
    res.json({ students: jsonStudents });
  } catch (error) {
    next(error);
  }
};

export const addStudentToSubject = async (req, res, next) => {
  const { subjectId } = req.params;
  const { userId } = req.body;
  try {
    await StudentSubject.create({ userId, subjectId });
    res.end();
  } catch (error) {
    next(error);
  }
};

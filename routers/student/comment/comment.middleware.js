export const injectUpdatedBy = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    req.body.studentId = studentId;
    req.body.updatedBy = req.mentorId;

    next();
  } catch (error) {
    next(error);
  }
};

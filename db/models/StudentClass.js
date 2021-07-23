module.exports = (sequelize, DataTypes) => {
  const StudentClass = sequelize.define("StudentClass", {
    attendanceStatus: DataTypes.INTEGER,
  });

  return StudentClass;
};

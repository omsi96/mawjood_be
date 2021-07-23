module.exports = (sequelize, DataTypes) => {
  const StudentClass = sequelize.define("StudentClass", {
    attendanceStatus: DataTypes.STRING,
  });

  return StudentClass;
};

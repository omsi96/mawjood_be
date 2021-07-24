module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    attendanceStatus: DataTypes.INTEGER,
  });

  return Attendance;
};

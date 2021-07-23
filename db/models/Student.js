module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    name: DataTypes.STRING,
  });

  return Student;
};

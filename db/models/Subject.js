module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
  });

  return Subject;
};

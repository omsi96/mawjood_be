module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    title: DataTypes.STRING,
    date: DataTypes.DATEONLY,
  });

  return Class;
};

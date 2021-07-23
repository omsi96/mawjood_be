module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    classSecret: DataTypes.STRING,
  });

  return Session;
};

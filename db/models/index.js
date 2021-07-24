"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relationships
// M:1 Session - Class
db.Class.hasMany(db.Session, {
  foreignKey: "classId",
  as: "sessions",
});
db.Session.belongsTo(db.Class, {
  foreignKey: "classId",
  as: "class",
});
// M:1 Subject - Class
db.Subject.hasMany(db.Class, {
  foreignKey: "subjectId",
  as: "classes",
});
db.Class.belongsTo(db.Subject, {
  foreignKey: "subjectId",
  as: "subject",
});
// M:N Student - Class through Attendance
db.User.belongsToMany(db.Class, {
  foreignKey: "studentId",
  through: { model: db.Attendance },
});
db.Class.belongsToMany(db.User, {
  foreignKey: "classId",
  through: { model: db.Attendance },
});

// M:N Student - Subject through Attendance
db.User.belongsToMany(db.Subject, {
  foreignKey: "userId",
  through: db.StudentSubject,
});
db.Subject.belongsToMany(db.User, {
  foreignKey: "subjectId",
  through: db.StudentSubject,
});

module.exports = db;

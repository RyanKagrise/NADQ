'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    emailAddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: "userId" });
    User.hasMany(models.Answer, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
  };
  return User;
};

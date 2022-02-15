'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.Question, { foreignKey: "questionId" });
    Answer.belongsTo(models.User, { foreignKey: "userId" });
    Answer.hasMany(models.Comment, { foreignKey: "answerId" });
  };
  return Answer;
};

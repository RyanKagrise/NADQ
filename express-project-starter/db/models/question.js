'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.Topic, { foreignKey: "topicId" });
    Question.belongsTo(models.User, { foreignKey: "userId" });
    Question.hasMany(models.Answer, { foreignKey: "questionId" });
  };
  return Question;
};

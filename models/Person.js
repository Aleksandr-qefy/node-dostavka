'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define("Person", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    modelName: 'people'
  });

  return Person;
}
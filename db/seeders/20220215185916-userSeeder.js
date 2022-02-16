'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

//faker.animal.type() => Question
//faker.address.cityName() => Topic
//faker.name.findName() => Username
//faker.internet.email() => Email
//faker.lorum.sentence() => Answer/Comments
//aA1! => Password


function fakerFunction (num) {
  const array = []
  // const hashedPassword = bcrypt.hashSync('aA1!', 12);
  for (let i=0; i<num; i++) {
    const object = {}
    object.userName = faker.name.findName().replace(' ', '');
    object.hashedPassword = bcrypt.hashSync('aA1!', 12);
    object.emailAddress = faker.internet.email();
    array.push(object);
  }
  return array;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      const user = fakerFunction(20);

      return queryInterface.bulkInsert('Users', user, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};

'use strict';

const faker = require('faker');

//faker.animal.type() => Question
//faker.address.cityName() => Topic
//faker.name.findName() => Username
//faker.internet.email() => Email
//faker.lorum.sentence() => Answer/Comments
//aA1! => Password

function fakerFunction(num) {
    const array = []
    for (let i = 0; i < num; i++) {
        const object = {}
        object.content = faker.animal.type();
        object.topicId = Math.ceil(Math.random() * 10)
        object.userId = Math.ceil(Math.random() * 20)
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
        const question = fakerFunction(20);

        return queryInterface.bulkInsert('Questions', question, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
       return queryInterface.bulkDelete('Questions', null, {});
    }
};
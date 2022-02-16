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
        object.content = faker.lorem.sentence();
        object.questionId = Math.ceil(Math.random() * 20)
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
        const answer = fakerFunction(20)

        return queryInterface.bulkInsert('Answers', answer, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
       return queryInterface.bulkDelete('Answers', null, {});
    }
};
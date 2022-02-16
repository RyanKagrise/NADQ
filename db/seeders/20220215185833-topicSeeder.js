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
        object.name = faker.address.cityName();
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
        const topic = fakerFunction(10);

        return queryInterface.bulkInsert('Topics', topic, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          */
        return queryInterface.bulkDelete('Topics', null, {});
    }
};
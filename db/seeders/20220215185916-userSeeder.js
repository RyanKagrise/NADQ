'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

//faker.animal.type() => Question
//faker.address.cityName() => Topic
//faker.name.findName() => Username
//faker.internet.email() => Email
//faker.lorum.sentence() => Answer/Comments
//aA1! => Password


// function fakerFunction (num) {
//   const array = []
//   // const hashedPassword = bcrypt.hashSync('aA1!', 12);
//   for (let i=0; i<num; i++) {
//     const object = {}
//     object.userName = faker.name.findName().replace(' ', '');
//     object.hashedPassword = bcrypt.hashSync('aA1!', 12);
//     object.emailAddress = faker.internet.email();
//     array.push(object);
//   }
//   return array;
// }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      // const user = fakerFunction(20);

      return queryInterface.bulkInsert('Users',[
      { userName: "Demo",
        emailAddress: "demo@aa.io",
        hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user1",
      emailAddress: "user1@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user2",
      emailAddress: "user2@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user3",
      emailAddress: "user3@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user4",
      emailAddress: "user4@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user5",
      emailAddress: "user5@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user6",
      emailAddress: "user6@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user7",
      emailAddress: "user7@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user8",
      emailAddress: "user8@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user9",
      emailAddress: "user9@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user10",
      emailAddress: "user10@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user11",
      emailAddress: "user11@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user12",
      emailAddress: "user12@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user13",
      emailAddress: "user13@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user14",
      emailAddress: "user14@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user15",
      emailAddress: "user15@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user16",
      emailAddress: "user16@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user17",
      emailAddress: "user17@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user18",
      emailAddress: "user18@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      { userName: "user19",
      emailAddress: "user19@aa.io",
      hashedPassword: bcrypt.hashSync('password'),
      },
      ], {});
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

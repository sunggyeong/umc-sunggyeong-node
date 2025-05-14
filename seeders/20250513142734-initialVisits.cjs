'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const visits = [];

    for (let i = 1; i <= 20; i++) {
      visits.push({
        user_id: faker.number.int({ min: 1, max: 50 }),
        store_id: faker.number.int({ min: 1, max: 20 }),
      });
    }

    await queryInterface.bulkInsert('visit', visits, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('visit', null, {});
  },
};

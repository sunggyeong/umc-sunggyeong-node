'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const progresses = [];

    for (let i = 1; i <= 20; i++) {
      progresses.push({
        user_id: faker.number.int({ min: 1, max: 50 }),     // user.id
        mission_id: faker.number.int({ min: 1, max: 30 }),  // mission.id
        state: faker.helpers.arrayElement(['도전중', '완료']),
      });
    }

    await queryInterface.bulkInsert('mission_progress', progresses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mission_progress', null, {});
  },
};

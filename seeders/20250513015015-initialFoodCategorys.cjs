'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('food_category', [
      {
        name: '한식',
        state: true,
      },
      {
        name: '중식',
        state: true,
      },
      {
        name: '일식',
        state: true,
      },
      {
        name: '양식',
        state: true,
      },
      {
        name: '분식',
        state: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('food_category', null, {});
  },
};

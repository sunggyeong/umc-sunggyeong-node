'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [];

    for (let i = 1; i <= 20; i++) {
      reviews.push({
        user_id: faker.number.int({ min: 1, max: 50 }),
        store_id: faker.number.int({ min: 1, max: 20 }),
        visit_id: i, // visit 테이블의 1~20번과 일치
        body: faker.lorem.sentences(2),
        rating: faker.number.int({ min: 1, max: 5 }),
      });
    }

    await queryInterface.bulkInsert('review', reviews, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('review', null, {});
  },
};

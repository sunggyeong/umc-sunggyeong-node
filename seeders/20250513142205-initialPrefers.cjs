'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const prefers = new Set();
    const records = [];

    // userId 1~50번 유저가 각자 1~3개의 랜덤한 카테고리를 선호
    for (let userId = 1; userId <= 50; userId++) {
      const howMany = faker.number.int({ min: 1, max: 3 });
      const picked = new Set();

      while (picked.size < howMany) {
        const categoryId = faker.number.int({ min: 1, max: 5 });
        const key = `${userId}-${categoryId}`;
        if (!prefers.has(key)) {
          prefers.add(key);
          picked.add(categoryId);

          records.push({
            user_id: userId,
            food_category_id: categoryId,
          });
        }
      }
    }

    await queryInterface.bulkInsert('prefer', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prefer', null, {});
  },
};

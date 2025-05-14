'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const missions = [];
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    for (let i = 1; i <= 30; i++) {
      missions.push({
        store_id: faker.number.int({ min: 1, max: 20 }), // store 1~20과 연결
        target_amount: faker.number.int({ min: 5000, max: 20000 }),
        deadline: faker.date.between({ from: now, to: sevenDaysLater }),
        number: faker.number.int({ min: 100000, max: 999999 }), // 임의 번호
      });
    }

    await queryInterface.bulkInsert('mission', missions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mission', null, {});
  },
};

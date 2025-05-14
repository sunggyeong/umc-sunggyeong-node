'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const stores = [];

    // 20개 매장 생성
    for (let i = 1; i <= 20; i++) {
      stores.push({
        store_name: `${faker.company.name()} ${faker.commerce.productAdjective()}점`,
        address: faker.location.streetAddress(),
        region_id: faker.number.int({ min: 1, max: 10 }),       // region ID (1~10)
        category_id: faker.number.int({ min: 1, max: 5 }),      // food_category ID (1~5)
      });
    }

     try {
      console.log('🟡 store 시드 삽입 시작...');
      await queryInterface.bulkInsert('store', stores, {});
      console.log('🟢 store 시드 삽입 완료!');
    } catch (err) {
      console.error('❌ STORE 시드 중 오류 발생!');
      console.error('📍 오류 메시지:', err.message);
      console.error('📂 Sequelize 전체 에러:', err);
      console.log('🧪 마지막 삽입 시도된 store 객체:', stores[stores.length - 1]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('store', null, {});
  },
};


'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('region', [
      { name: '동작구' },
      { name: '서초구' },
      { name: '관악구' },
      { name: '송파구' },
      { name: '용산구' },
      { name: '강남구' },
      { name: '영등포구' },
      { name: '마포구' },
      { name: '종로구' },
      { name: '중구' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('region', null, {});
  },
};

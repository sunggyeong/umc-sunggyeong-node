'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const userTerms = [];

    for (let i = 1; i <= 50; i++) {
      userTerms.push({
        location_chk: faker.datatype.boolean(),
        marketing_chk: faker.datatype.boolean(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      let email;
      do {
        email = faker.internet.email();
      } while (users.find((u) => u.email === email));

      users.push({
        email,
        name: faker.person.lastName() + faker.person.firstName(),
        gender: faker.helpers.arrayElement(['남성', '여성']),
        birth: faker.date.birthdate({ min: 20, max: 50, mode: 'age' }),
        address: faker.location.city(),
        detail_address: faker.location.streetAddress(),
        phone_number: '010' + faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        point: faker.number.int({ min: 0, max: 1000 }),
        phone_verification: faker.datatype.boolean(),
        user_terms_id: i,
      });
    }

    try {
      await queryInterface.bulkInsert('user_terms', userTerms, {});
      await queryInterface.bulkInsert('user', users, {});
    } catch (err) {
      console.error('시드 중 오류 발생!');
      console.error('오류 메시지:', err.message);
      console.error('Sequelize 오류 전체:', err);
      console.error('마지막 삽입 시도된 유저:', users[users.length - 1]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.bulkDelete('user_terms', null, {});
  },
};

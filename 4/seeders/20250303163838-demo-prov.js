'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Provinsi_tbs', [
      {
        user_id: 1,
        nama: 'Sumatera Selatan',
        diresmikan: new Date(),
        photo: 'https://picsum.photos/200',
        pulau: 'Sumatera',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        nama: 'kalimantan Utara',
        diresmikan: new Date(),
        photo: 'https://picsum.photos/200',
        pulau: 'Kalimantan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        nama: 'Jawa Timur',
        diresmikan: new Date(),
        photo: 'https://picsum.photos/200',
        pulau: 'Jawa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Provinsi_tbs', null, {});
  }
};

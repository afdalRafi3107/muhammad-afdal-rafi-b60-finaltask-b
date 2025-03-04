'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provinsi_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provinsi_tb.hasMany(models.Kabupaten_tb, {
        foreignKey: "provinsi_id",
        as: "kabupaten_tbs",
      });
    }
  }
  Provinsi_tb.init({
    user_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    diresmikan: DataTypes.DATE,
    photo: DataTypes.STRING,
    pulau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Provinsi_tb',
  });
  return Provinsi_tb;
};
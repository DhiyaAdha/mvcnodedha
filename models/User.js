// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db-config.js');

const User = sequelize.define('User', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;

// models/barang.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db-config.js');

const Barang = sequelize.define('Barang', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty_barang: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.ENUM('ada', 'kosong'),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
},
{
  tableName: 'barang',
  timestamps: false,
});

module.exports = Barang;

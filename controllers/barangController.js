const Barang = require('../models/Barang.js');
const sequelize = require('../db-config.js');

exports.getAllBarang = async (req, res) => {
    try {
        const data_barang = await sequelize.query('SELECT * FROM barang ORDER BY id ASC', { type: sequelize.QueryTypes.SELECT });
        res.render('/barang/index', {
            title: 'Pages Data Barang',
            subTitle: 'Page Data Barang',
            barang_call: data_barang,
        });
        res.json(data_barang);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
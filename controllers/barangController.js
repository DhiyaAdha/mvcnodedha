const Barang = require('../models/Barang.js');
const sequelize = require('../db-config.js');

exports.getAllBarang = async (req, res) => {
    try {
        const data_barang = await sequelize.query('SELECT * FROM barang ORDER BY id ASC', { type: sequelize.QueryTypes.SELECT });
        const stock_ada_barang = await Barang.findAll({
            where: {
                stock: 'ada',
            },
        });

        // Proses data untuk mendapatkan total kuantitas per bulan
        const processedData = stock_ada_barang.reduce((acc, entry) => {
            const month = new Date(entry.timestamp).getMonth();
            acc[month] = (acc[month] || 0) + entry.qty_barang;
            return acc;
        }, {});

        // Konversi objek processedData menjadi array untuk Chart.js
        const xValues = Object.keys(processedData).map(month => {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[parseInt(month)]; // Konversi nomor bulan menjadi nama bulan
        });

        const yValues = Object.values(processedData);

        // Definisikan warna untuk Chart.js
        const barColors = ['#b91d47', '#00aba9', '#2b5797', '#e8c3b9', '#1e7145'];

        // Periksa apakah variabel tidak kosong dan berikan nilai default jika perlu
        const safeXValues = xValues || [];
        const safeYValues = yValues || [];
        const safeBarColors = barColors || [];

        // Tampilkan di konsol web
        console.log('Safe xValues:', safeXValues);
        console.log('Safe yValues:', safeYValues);
        console.log('Safe barColors:', safeBarColors);

        // Kirim respons JSON jika permintaan datang dari AJAX atau JSON diterima
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.json({ xValues: safeXValues, yValues: safeYValues, barColors: safeBarColors });
        } else {
            // Jika tidak, render halaman dengan data yang diolah
            res.render('barang/index', {
                title: 'Pages Data Barang',
                subTitle: 'Page Data Barang',
                xValues: safeXValues,
                yValues: safeYValues,
                barColors: safeBarColors,
            });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//before update data-tables

/**
 * (1) fungsi crud user
 * dengan routing dan views yang diaraskan
 */

const User = require('../models/User.js');
const sequelize = require('../db-config.js');
// const { where } = require('sequelize');

// Render create page
exports.getCreatePage = (req, res) => {
    res.render('create', {
        title: 'Create User',
        subTitle: 'Create User Page',
        additionalInfo: 'Tambah User',
    });
};

// Create user
exports.createUser = async (req, res) => {
    try {
        // Add your logic for saving user data here
        const { nama, id_user, alamat, gender } = req.body;
        const user = await User.create({ nama, id_user, alamat, gender });

        // Menampilkan informasi user ke konsol
        // console.log('User created:', user);

        // Redirect ke halaman index setelah membuat pengguna
        res.redirect('/users');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await sequelize.query('SELECT * FROM user ORDER BY id ASC', { type: sequelize.QueryTypes.SELECT });
        res.render('index', {
            title: 'Pages User',
            subTitle: 'Page Users',
            additionalInfo: 'Data Monitoring User',
            users: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fungsi untuk menangani permintaan halaman detail user
exports.redirectToDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (user) {
            // Render halaman detail.handlebars dan kirimkan data pengguna
            res.render('detail', { user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fungsi untuk menangani permintaan halaman edit user
exports.redirectToEditPage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (user) {
            // Mengambil seluruh data pengguna untuk ditampilkan pada halaman edit
            const allUsers = await User.findAll();

            // Render halaman detail_update.handlebars dan kirimkan data pengguna
            res.render('update', { user, allUsers });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update user 
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, alamat, gender, id_user } = req.body;

        // Validasi id harus berupa angka
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'Invalid id format' });
        }

        // Cek apakah ada data yang perlu diupdate
        if (nama || alamat || gender || id_user) {
            // Buat objek untuk menyimpan data yang ingin diupdate
            const updateData = {};

            if (nama) {
                updateData.nama = nama;
            }

            if (alamat) {
                updateData.alamat = alamat;
            }

            if (gender) {
                updateData.gender = gender;
            }

            if (id_user) {
                updateData.id_user = id_user;
            }

            // Melakukan update hanya jika ada data yang ingin diupdate
            const [updatedRows] = await User.update(
                updateData,
                { where: { id: id } }
            );

            if (updatedRows > 0) {
                // Jika berhasil diupdate, redirect ke halaman /users
                return res.redirect('/users');
            } else {
                // Jika id tidak ditemukan
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            // Jika tidak ada data yang perlu diupdate, langsung redirect ke /users
            return res.redirect('/users');
        }
    } catch (error) {
        console.error('Error updating user by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            // Setelah berhasil dihapus, redirect ke halaman /users
            res.redirect('/users');
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * fungsi custom ui
 */
exports.getCustomUiPage = async (req, res) => {
    try {
        const user_call = await sequelize.query('SELECT * FROM user ORDER BY id ASC', { type: sequelize.QueryTypes.SELECT });
        // Cek apakah permintaan datang dari AJAX
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // Jika ya, kirim respons JSON
            res.json({ data: user_call });
        } else {
            // Jika tidak, render halaman 'customUi'
            res.render('customUi', {
                data: user_call
            });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



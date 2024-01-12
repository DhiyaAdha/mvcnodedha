/**
 * (1) fungsi crud user
 * dengan routing dan views yang diaraskan
 */

const User = require('../models/User.js');
const sequelize = require('../db-config.js');

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
      const users = await sequelize.query('SELECT * FROM user ORDER BY id DESC', { type: sequelize.QueryTypes.SELECT });
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

// Read user by ID
exports.redirectToEditPage = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (user) {
            // Render halaman detail_update.handlebars dan kirimkan data pengguna
            res.render('detail_update', { user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, alamat, gender } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.nama = nama;
            user.alamat = alamat;
            user.gender = gender;
            await user.save();
            res.redirect('/users'); // Redirect ke halaman index setelah update berhasil
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

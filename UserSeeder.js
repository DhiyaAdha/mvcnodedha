const { User } = require('./models/User.js');

const seedData = [
  { nama: 'John Doe', id_user: 'PM12456', alamat: '123 Main Street', gender: 'Male' },
  { nama: 'Jane Smith', id_user: 'PM14456', alamat: '456 Oak Avenue', gender: 'Female' },
  { nama: 'Bob Johnson', id_user: 'LJMM23002', alamat: '789 Pine Road', gender: 'Male' },
];

async function seedDatabase() {
  try {
    await User.bulkCreate(seedData);
    console.log('Seeder: Data inserted successfully.');
  } catch (error) {
    console.error('Seeder Error:', error);
  }
}

seedDatabase();
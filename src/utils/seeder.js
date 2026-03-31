const pool = require('../config/db');

async function runSeeders() {
  try {
    // Check and seed roles
    const [roles] = await pool.query('SELECT COUNT(*) as count FROM roles');
    if (roles[0].count === 0) {
      console.log('Seeding roles...');
      await pool.query(`
        INSERT INTO roles (name, level_access) VALUES 
        ('Admin', 'all'),
        ('Staff', 'limited')
      `);
      console.log('Roles seeded successfully.');
    } else {
      console.log('Roles already exist. Skipping seeder.');
    }

    // Check and seed categories
    const [categories] = await pool.query('SELECT COUNT(*) as count FROM categories');
    if (categories[0].count === 0) {
      console.log('Seeding categories...');
      await pool.query(`
        INSERT INTO categories (name) VALUES 
        ('Ban Luar'),
        ('Ban Dalam'),
        ('Oli'),
        ('Sparepart')
      `);
      console.log('Categories seeded successfully.');
    } else {
      console.log('Categories already exist. Skipping seeder.');
    }

    // Check and seed units
    const [units] = await pool.query('SELECT COUNT(*) as count FROM units');
    if (units[0].count === 0) {
      console.log('Seeding units...');
      await pool.query(`
        INSERT INTO units (name) VALUES 
        ('Pcs'),
        ('Botol'),
        ('Liter'),
        ('Lembar')
      `);
      console.log('Units seeded successfully.');
    } else {
      console.log('Units already exist. Skipping seeder.');
    }

  } catch (error) {
    console.error('Error during seeding process:', error);
  }
}

module.exports = runSeeders;

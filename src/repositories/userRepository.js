const pool = require('../config/db');

class UserRepository {
  async findById(id) {
    const [rows] = await pool.query('SELECT id, username, email, role_id, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  async createUser({ username, email, password, role_id }) {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)',
      [username, email, password, role_id || null]
    );
    return {
      id: result.insertId,
      username,
      email,
      role_id
    };
  }
}

module.exports = new UserRepository();

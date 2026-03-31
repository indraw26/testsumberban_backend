const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
require('dotenv').config();

class AuthService {
  async register({ username, email, password, role_id }) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email is already registered');
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role_id
    });
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role_id: user.role_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d'
    });

    return { token, user: payload };
  }

  async getMe(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}


module.exports = new AuthService();

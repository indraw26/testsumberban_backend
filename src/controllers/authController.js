const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password, role_id } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
      }

      const user = await authService.register({ username, email, password, role_id });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      if (error.message === 'Email is already registered' || error.message === 'Username is already taken') {
        return res.status(409).json({ error: error.message });
      }
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const { token, user } = await authService.login({ email, password });
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ error: error.message });
      }
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMe(req, res) {
    try {
      const user = await authService.getMe(req.user.id);
      res.status(200).json({ user });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('GetMe error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}


module.exports = new AuthController();

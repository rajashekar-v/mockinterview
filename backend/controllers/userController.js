const User = require('../models/User');

const userController = {
  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;

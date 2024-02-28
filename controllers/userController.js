const { User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update an existing user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },

   // delete an existing user
   async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a friend
  async addFriend (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      let currentFriends = user.friends;
      const newFriends = currentFriends.concat([req.params.friendId]);
      const dbUserData = await User.findByIdAndUpdate(req.params.userId, {friends: newFriends});
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // remove a friend
  async removeFriend (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      let currentFriends = user.friends;
      const removeFriend = currentFriends.splice(currentFriends.indexOf(req.params.friendId), 1);
      const dbUserData = await User.findByIdAndUpdate(req.params.userId, {friends: currentFriends});
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created, but no users with this ID' });
      }

      res.json({ message: 'thought created' });
    } catch (err) {
      console.error(err);
    }
  },
  // update an existing thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete an existing thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);

    } catch (err) {
      res.status(500).json(err);
    }
  },
// add a reaction
async addReaction (req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    let currentReactions = thought.reactions;
    const newReactions = currentReactions.concat(req.body);
    const dbthoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, {reactions: newReactions});
    res.json(dbthoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
},

// remove a reaction
async removeReaction (req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    let currentReactions = thought.reactions;
    const removeReaction = currentReactions.splice(currentReactions.indexOf(req.body.reactionId), 1);
    const dbthoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, {reactions: currentReactions});
    res.json(dbthoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
},
};

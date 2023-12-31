const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet:{thoughts: thought._id}},
            {runValidators:true, new:true}
          )
          res.json({thought, user});
        } catch (err) {
          res.status(500).json(err);
        }
      },

  // Delete a thought and remove them from the database
async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No such thought exists' });
    }
    res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// Update a thought
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId},
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

}
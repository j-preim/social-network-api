const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {type: Schema.Types.ObjectId, auto: true},
  reactionBody: {type: String, required: true, maxLength: 280},
  username: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
}, {_id: false});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Please enter text"],
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {type: Date, default: Date.now},
    username: {type: String, required: true},
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { findByIdAndUpdate } = require("../models/User");
const {
  usernames,
  getRandomThoughts,
  genRandomIndex,
  thoughtsByUsername,
} = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Empty arrays for randomly generated users and thoughts
  const thoughts = [...getRandomThoughts(20)];
  const users = [];
  const friends = [];

  // Wait for the thoughts to be inserted into the database
  const insertedThoughts = await Thought.collection.insertMany(thoughts);

  const findAllThoughts = await Thought.collection.find({}).toArray();


  async function generateUsers(names) {
    for (i = 0; i < names.length; i++) {
      let usernameThis = names[i];
      let thoughtIds = [];
      for (x = 0; x < findAllThoughts.length; x++) {
        if (findAllThoughts[x].username === usernameThis) {
          thoughtIds.push(findAllThoughts[x]._id);
        }
      }
      users.push({
        username: names[i],
        email: names[i] + "@test.com",
        thoughts: thoughtIds,
        friends: [],
      });
    }
    return users;
  }

  const usersToInsert = await generateUsers(usernames);

  // Wait for the users to be inserted into the database
  const insertedUsers = await User.collection.insertMany(usersToInsert);

  for (i = 0; i < users.length; i++) {
    const selectedUsername = users[i].username;
    const findUser = await User.collection.findOne({
      "username": selectedUsername,
    });
    console.log(findUser);
    const randomFriends = [];
    randomFriends.push(
      users[genRandomIndex(users)]._id,
      users[genRandomIndex(users)]._id
    );
    User.collection.updateOne(
      { "username": selectedUsername },
      { $set: { "friends": randomFriends } }
    );
  }

  // Log out a pretty table for comments and posts
  console.table(users);
  console.table(thoughts);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});

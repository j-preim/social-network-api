const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { findByIdAndUpdate } = require("../models/User");
const { usernames, getRandomThoughts, genRandomIndex, thoughtsByUsername } = require("./data");

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
  await Thought.collection.insertMany(thoughts);

  for (i = 0; i < usernames.length; i++) {
    users.push({
      username: usernames[i],
      email: usernames[i] + "@test.com",
      thoughts: [],
      friends: [],
    });
  }

  // Wait for the users to be inserted into the database
  await User.collection.insertMany(users);

  // await User.collection.updateOne({"username":"Alex"}, {$set: {"username":"Alexis"}});

  // const findAllThoughts = await Thought.collection.find({}).toArray();


  for (i = 0; i < users.length; i++) {
    const selectedUsername = users[i].username;
    // const findUser = await User.collection.findOne({
    //   "username": selectedUsername,
    // });
    const randomFriends = [];
    const thoughtIds = [];
    const userThoughts = await Thought.collection.find({"username":selectedUsername}).toArray();
    console.log(selectedUsername, userThoughts.length)
    // thoughtIds = thoughtsByUsername(userThoughts);
    randomFriends.push(
      users[genRandomIndex(users)]._id,
      users[genRandomIndex(users)]._id
    );
    User.collection.updateOne(
      { "username": selectedUsername },
      { $set: { "thoughts": thoughtIds, "friends": randomFriends } }
    );
  }


  // Log out a pretty table for comments and posts
  console.table(users);
  console.table(thoughts);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});

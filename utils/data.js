const usernames = [
  'Xander',
  'Jared',
  'Courtney',
  'Clark',
  'Grace',
  'Kelsey',
  'Alex',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const thoughts = [
  'Decision Trackers are awesome',
  'Find My Phone is a useful app',
  'Learn Piano is not very good for learning Piano',
  'Starbase Defender is a great game, I love it',
  'Tower Defense is okay',
  'Monopoly Money is better than real money IMO',
  'Movie trailers are just the best parts of a movie distilled into 90 seconds',
  'Hello world, this is a comment',
  'Social media is a big waste of time',
  'Notes is my most used app',
  'Messages is open on my computer 24/7',
  'Email is open on my computer',
  'Compass is never opened',
  'Firefox is great for privacy',
];

const reactions = [
  'Decision Trackers are awesome',
  'Find My Phone is a useful app',
  'Learn Piano is not very good for learning Piano',
  'Starbase Defender is a great game, I love it',
  'Tower Defense is okay',
  'Monopoly Money is better than real money IMO',
  'Movie trailers are just the best parts of a movie distilled into 90 seconds',
  'Hello world, this is a comment',
  'Social media is a big waste of time',
  'Notes is my most used app',
  'Messages is open on my computer 24/7',
  'Email is open on my computer',
  'Compass is never opened',
  'Firefox is great for privacy',
];


const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user name
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random reactions given a number (ex. 10 reactions === getRandomReactions(10))
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

// Function to generate random thoughts given a username and number (ex. 10 thoughts === getRandomThoughts(10))
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomUsername(),
      reactions: [getRandomReactions(2)]
    });
  }
  return results;
};

const thoughtsByUsername = (thoughts) => {
  let theseThoughts = thoughts;
  let userThoughtIds = [];
  console.log(theseThoughts);
  for (i = 0; i < theseThoughts.length; i++) {
    userThoughtIds.push(theseThoughts[i]._id);
  }
  return userThoughtIds;
}

// Export the functions for use in seed.js
module.exports = {
  usernames,
  getRandomUsername,
  getRandomReactions,
  getRandomThoughts,
  genRandomIndex,
  thoughtsByUsername
};

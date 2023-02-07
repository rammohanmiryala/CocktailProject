const db = require("../config/connection");
const { Drink, User, Review } = require("../models");
const userSeeds = require("./userSeeds.json");
const drinkSeeds = require("./DrinkSeeds.json");
const reviewSeeds = require("./ReviewSeeds.json");

require("dotenv").config();

db.once("open", async () => {
  await User.deleteMany({});
  await Drink.deleteMany({});
  await Review.deleteMany({});

  const users = await User.create(userSeeds);
  const drinks = await Drink.insertMany(drinkSeeds);
  const reviews = await Review.insertMany(reviewSeeds);

  for (index of reviews) {
    // randomly add each review to a drink
    const tempDrink = drinks[Math.floor(Math.random() * drinks.length)];
    tempDrink.reviews.push(index._id);
    await tempDrink.save();
  }

  // for (let i = 0; i < thoughtSeeds.length; i++) {
  //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
  //   const user = await User.findOneAndUpdate(
  //     { username: thoughtAuthor },
  //     {
  //       $addToSet: {
  //         thoughts: _id,
  //       },
  //     }
  //   );
  // }

  // for (let i = 0; i < reviews.length; i++) {

  //   const use = users[i].username;
  //   const rew = reviews[i].reviewAuthor;

  //   console.log(rew, use)

  //   if (use != rew) {
  //     console.log("no");
  //   } else {

  //    console.log("yes");
  //   }
  // }

  console.log("Seeding complete! 🌱");
  process.exit(0);
});

const db = require("../config/connection");
const { Drink, Review, User } = require("../models");
const userSeeds = require("./userSeeds.json");
const drinkSeeds = require("./DrinkSeeds.json");
const reviewSeeds = require("./ReviewSeeds.json");
require("dotenv").config();

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  
//delete existing tables from db
  
  await Drink.deleteMany({});
  await Review.deleteMany({});

  // // bulk create each model

  const drinks = await Drink.insertMany(drinkSeeds);
  const reviews = await Review.insertMany(reviewSeeds);

  for (let newReview of reviews) {
    // randomly add each reviews to a Drinks
    const tempDrinks = drinks[Math.floor(Math.random() * drinks.length)];
    tempDrinks.reviews.push(newReview._id);
    await tempDrinks.save();
  }

  console.log("Seeding complete! 🌱");
  process.exit(0);
});

//  const drinksSeed = []

// for (var i = 0; i < drinks.length; i++) {
//   const drink = drinks[i];

//   const review = reviews[ma]

//   drinksSeed.push({
//     drink,

//   });

// }
// console.log(drinksSeed);

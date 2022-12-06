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

  const Drinks = await Drink.insertMany(drinkSeeds);
  const Reviews = await Review.insertMany(reviewSeeds);

  for (newReview of Reviews) {
    // randomly add each reviews to a Drinks
    const tempDrinks = Drinks[Math.floor(Math.random() * Drinks.length)];
    tempDrinks.Reviews.push(newReview._id);
    await tempDrinks.save();
  }

  console.log("Seeding complete! 🌱");
  process.exit(0);
});

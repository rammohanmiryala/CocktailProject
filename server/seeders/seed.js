const db = require("../config/connection");
const { Drink, Review, User } = require("../models");
const userSeeds = require("./userSeeds.json");
const drinkSeeds = require("./DrinkSeeds.json");
const reviewSeeds = require("./ReviewSeeds.json");
require("dotenv").config();

db.once("open", async () => {
  
    await User.deleteMany({});
    await Drink.deleteMany({});
    await Review.deleteMany({});

  

  
    const user = await User.create(userSeeds)
    const drinks = await Drink.insertMany(drinkSeeds);
    const review = await Review.insertMany(reviewSeeds);

  console.log("Seeding complete! 🌱");
  process.exit(0);
});


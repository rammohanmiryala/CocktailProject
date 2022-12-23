const db = require("../config/connection");
const { Drink,User } = require("../models");
const userSeeds = require("./userSeeds.json");
const drinkSeeds = require("./DrinkSeeds.json");

require("dotenv").config();

db.once("open", async () => {
  
    await User.deleteMany({});
    await Drink.deleteMany({});
    const user = await User.create(userSeeds)
    const drinks = await Drink.insertMany(drinkSeeds);


  console.log("Seeding complete! 🌱");
  process.exit(0);
});


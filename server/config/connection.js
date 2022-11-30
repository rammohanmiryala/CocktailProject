const mongoose = require("mongoose");
require("dotenv").config();


const URI = process.env.MONGODB_URL || "mongodb://localhost:27017/cocktails";
console.log(URI);
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


module.exports = mongoose.connection;

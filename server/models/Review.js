const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    minlength: 1,
    required: true,
    maxlength: 280,
    trim: true,
  },
  reviewAuthor: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  drink: {
    type: Schema.Types.ObjectId,
    ref: "Drink",
    
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;

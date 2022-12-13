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
},{
  toJSON: {
    virtuals: true,
  },
  id: false,
});


// Create a virtual property `drinkCount` that gets the amount of drinks per post
reviewSchema.virtual('drinkCount').get(function () {
  return this.drink.length;
});
const Review = model("Review", reviewSchema);

module.exports = Review;

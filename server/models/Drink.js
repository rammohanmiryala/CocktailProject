const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const drinkSchema = new Schema(
  {
    drinkId: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    reviews: [
      {
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
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Drink = model("Drink", drinkSchema);

module.exports = Drink;

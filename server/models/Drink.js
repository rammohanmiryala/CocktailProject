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
        type: Schema.Types.ObjectId,
        ref: "Review",
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

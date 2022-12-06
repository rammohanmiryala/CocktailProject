const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const drinkSchema = new Schema({
  idDrink: {
    type: Number,
    required: true

  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  Reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]

});

const Drink = model("Drink", drinkSchema);

module.exports = Drink;

const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ratingSchema = new Schema({
    ratings: [{ type: Schema.ObjectId, ref: "Rating" }],
});

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
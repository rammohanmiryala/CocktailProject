const { AuthenticationError } = require("apollo-server-express");
const { User, Review, Drink } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    reviews: async () => {
      return Review.find({});
    },

    drink: async () => {
      return await Drink.find({});
    },

    drinks: async () => {
      return Drink.find({}).populate("reviews");
    },

    reviews: async () => {
      return Review.find({}).populate("reviews");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("reviews");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { drinkId, reviewText, rating }, context) => {
      if (context.user) {
        return Drink.findOneAndUpdate(
          { _id: drinkId },
          {
            $addToSet: {
              reviews: {
                reviewText,
                rating,
                reviewAuthor: context.user.username,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

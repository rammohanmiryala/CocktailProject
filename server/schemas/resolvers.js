const { AuthenticationError } = require("apollo-server-express");
const { User, Drink } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // find each person with a name , selecting the name
  Query: {
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("drinks");
    },

    drink: async (parent, { drinkId }) => {
      return await Drink.findOne({ drinkId }).populate("reviews");
    },

    users: async () => {
      return await User.find({}).populate("drinks").populate({
        path: "drinks",
        populate: "reviews",
      });
    },

    drinks: async () => {
      return await Drink.find({}).populate("reviews");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
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

    addReview: async (
      parent,
      { drinksId, reviewText, reviewAuthor, rating },
      context
    ) => {
      if (context.user) {
        return Drink.findOneAndUpdate(
          { drinksId },
          {
            $addToSet: {
              reviews: { reviewText, reviewAuthor, rating },
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
    removeReview: async (parent, { drinksId, reviewId }, context) => {
      if (context.user) {
        return Drink.findOneAndUpdate(
          { drinksId },
          {
            $pull: {
              reviews: {
                _id: reviewId,
                reviewAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateReview: async (_, { ID, reviewText }) => {
      // Find and update the matching class using the destructured args
      return await Drink.findOneAndUpdate(
        { _id: ID },
        { reviewText:reviewText  },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

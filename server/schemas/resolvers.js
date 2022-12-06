const { AuthenticationError } = require('apollo-server-express');
const { User, Review,Drink } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('reviews');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('reviews');
    },
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
    drinks: async (parent, { idDrink }) => {
      const params = idDrink ? { idDrink } : {};
      return Drink.find(params).sort({ createdAt: -1 });
    },
    drink: async (parent, { idDrink }) => {
      return Drink.findOne({ _id: idDrink });
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
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

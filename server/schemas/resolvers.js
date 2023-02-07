const { AuthenticationError } = require("apollo-server-express");
const { User, Drink, Review } = require("../models");
const { signToken } = require("../utils/auth");
const _ = require("lodash");

const resolvers = {
  
  Query: {
    users: async () => {
      return await User.find({}).populate({
        path: "drinks",
        populate: { path: "reviews" },
        
      });
    },

    user: async (parent, { username}) => {
      return await User.findOne({ username }).populate({
        path: "drinks",
        populate: {
          path: "reviews",
          // need filter with username and reviewAuthor  ( filter only  username and reviewAuthor is equal )
        },
      });
    },

    drinks: async () => {
      return await Drink.find({}).populate("reviews");
    },
    reviews: async () => {
      return await Review.find({});
    },

    drink: async (parent, { drinkId }) => {
      return await Drink.findOne({ drinkId }).populate("reviews");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("drinks");
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
      { drink_id, reviewText, reviewAuthor, rating, drinkId }
    ) => {
      const reviewDate = await Review.create({
        reviewText,
        reviewAuthor,
        rating,
      });

      const drinkData = await Drink.findOneAndUpdate(
        { drinkId },
        { $addToSet: { reviews: reviewDate._id } },
        { new: true }
      );
      console.log(drinkData.reviews.reviewAuthor)
      // await User.findOneAndUpdate(
      //   { username :},
      //   { $addToSet: { reviews: reviewDate._id } },
      //   { new: true }
      // );

      
    },
  },
};

module.exports = resolvers;

// addReview: async (
//   parent,
//   { drink_id, reviewText, reviewAuthor, rating }
// ) => {
//   Review.create({ reviewText, reviewAuthor, rating }).then((review) => {
//     return Drink.findOneAndUpdate(
//       { _id: drink_id },
//       { $addToSet: { reviews: review._id } },
//       { new: true }
//     );
//   });
// }

// module.exports = resolvers;
// students.updateOne(
//   { _id: 1, grades: 80 },
//   { $set: { "grades.$" : 82 } }
// )

// addReview: async (
//   parent,
//   { drinksId, reviewText, reviewAuthor, rating },
//   context
// ) => {
//   if (context.user) {
//     return Drink.findOneAndUpdate(
//       { drinksId },
//       {
//         $addToSet: {
//           reviews: { reviewText, reviewAuthor, rating },
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//   }
//   throw new AuthenticationError("You need to be logged in!");
// },
// removeReview: async (parent, { drinksId, reviewId }, context) => {
//   if (context.user) {
//     return Drink.findOneAndUpdate(
//       { drinksId },
//       {
//         $pull: {
//           reviews: {
//             _id: reviewId,
//             reviewAuthor: context.user.username,
//           },
//         },
//       },
//       { new: true }
//     );
//   }
//   throw new AuthenticationError("You need to be logged in!");
// },

// updateReview: async (parent, { drinksId,reviewId, reviewText }) => {
//   // Find and update the matching class using the destructured args
//   return await Drink.updateOne(
//     { drinksId, _id:reviewId },
//     { $set: { reviewText: reviewText } },
//     // Return the newly updated object instead of the original
//     { new: true }
//   );
// },

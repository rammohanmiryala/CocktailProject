const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    userType: Boolean
    drinks: [Drink]
  }
  type Drink {
    _id: ID
    drinkId: Int
    createdAt: String
    reviews: [Review]
  }
  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    rating: Int
    createdAt: String
    drink:Drink
  }
 

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    drinks: [Drink]
    drink(drinkId: ID!): Drink
    reviews: [Review]
    review(reviewId: ID!): Review
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(drinkId:ID!, reviewText: String!,rating: Int): Review
  }
`;

module.exports = typeDefs;

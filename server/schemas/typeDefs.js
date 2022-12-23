const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
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
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    drinks: [Drink]
    drink(drinkId: Int!): Drink
    review(reviewId: ID!): Drink
    me: User
  }



  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(
      drinksId: Int!
      reviewText: String!
      reviewAuthor: String!
      rating: Int!
    ): Drink
    removeReview(drinksId: Int!, reviewId: ID!): Drink
    updateReview(ID: ID!, reviewText: String): Drink
    
  }
`;

module.exports = typeDefs;

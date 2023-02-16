const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    userType: Boolean
    drinks: [Drink] 
    # user comments on many drinks 
  }
  type Drink {
    _id: ID
    drinkId: Int!
    createdAt: String
    reviews: [Review]
    # drinks can have many drinks 
  }
  type Review {
    _id: ID
    reviewText: String!
    reviewAuthor: String! # username and reviewauthor is same as user
    rating: Int
    createdAt: String
    
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]
    reviews: [Review]
    drinks: [Drink]
    drink(drinkId: Int!): Drink
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(
      drink_id: ID!
      drinkId: Int!
      reviewText: String!
      reviewAuthor: String!
      rating: Int!
    ): Drink
    removeReview(drinksId: Int!, reviewId: ID!): Drink
    updateReview(drinksId: Int!, reviewId: ID!, reviewText: String): Drink
  }
`;

module.exports = typeDefs;

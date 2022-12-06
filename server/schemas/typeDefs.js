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
    idDrink: Number
    createdAt: String
    # An exclamation point (!) after a declared field's type means "this field's value can never be null.
    Review: [Review]
  }
  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    rating: Number
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
    drink(idDrink: Number!): Drink

    review(reviewId: ID!): Review
    reviews(username: String): [Review]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

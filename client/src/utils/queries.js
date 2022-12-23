import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      drinks {
        _id
        drinkId
        createdAt
      }
    }
  }
`;
export const QUERY_DRINK = gql`
  query getdrink($drinkId: Int!) {
    drink(drinkId: $drinkId) {
      _id
      drinkId
      createdAt
      reviews {
        _id
        reviewAuthor
        reviewText
        rating
        createdAt
      }
    }
  }
`;

export const QUERY_DRINKS = gql`
  query {
    drinks {
      _id
      drinkId
      createdAt
      reviews {
        _id
        reviewText
        reviewAuthor
        rating
        createdAt
      }
    }
  }
`;

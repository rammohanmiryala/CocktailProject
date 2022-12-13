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
  query getDrink($drinkId: Int!) {
    drink(drinkId: $drinkId) {
      _id
      drinkId
      createdAt
      reviews {
        _id
        reviewText
        reviewAuthor
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
    }
  }
`;
// export const QUERY_DRINK = gql`
//   query getdrink($id: ID!) {
//     drink(id: $id) {
//       _id
//       drinkId
//       reviews {
//         _id
//         reviewAuthor
//         rating
//         createdAt
//       }
//     }
//   }
// `;

import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`;

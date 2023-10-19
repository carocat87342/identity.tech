import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      result
      message
    }
  }
`;

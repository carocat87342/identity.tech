import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragments';

export const LOGIN = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  query Login($input: LoginInput) {
    login(input: $input) {
      result
      token
      user {
        ...CORE_USER_FIELDS
      }
    }
  }
`;

export const FETCH_VERIFY_TOKEN = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  query VerifyToken($token: String) {
    verifyToken(token: $token) {
      ...CORE_USER_FIELDS
    }
  }
`;
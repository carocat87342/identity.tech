import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragments';

export const GET_FILES = gql`
  query getFiles {
    getFiles {
      result
      error
      files {
        id
        filename
        size
        format
        uploadedOn
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  mutation updateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      result
      error
      user {
        ...CORE_USER_FIELDS
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  query getEmployees {
    getEmployees {
      result
      error
      employees {
        ...CORE_USER_FIELDS
      }
    }
  }
`;
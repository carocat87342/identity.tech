
import { gql } from '@apollo/client';
import * as FRAGMENT from 'apollo/fragments';

export const ADD_EMPLOYEE = gql`
  ${FRAGMENT.CORE_USER_FIELDS}
  mutation AddEmployee($input: UpdateUserInput) {
    addEmployee(input: $input) {
      result
      error
      employee {
        ...CORE_USER_FIELDS
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($input: UpdateRoleInput) {
    updateRole(input: $input) {
      result
      error
    }
  }
`
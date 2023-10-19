import { gql } from '@apollo/client';

export const CORE_USER_FIELDS = gql`
  fragment CORE_USER_FIELDS on UserType {
    id
    firstName
    lastName
    email
    password
    role
    emailVerified
    activePeople
    weeklyReport
    utilizationNotifications
  }
`;

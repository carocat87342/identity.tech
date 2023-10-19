import * as MUTATION from 'apollo/mutations';
import * as QUERY from 'apollo/queries';
import GqlClient from 'apollo/client';


export const useLogin = ({email, password}) =>
  GqlClient.getInstance().client.query({
    query: QUERY.LOGIN,
    variables: {
      input: {
        email,
        password
      }
    },
    fetchPolicy: 'no-cache',
});

export const useRegister = ({firstName, lastName, email, role, password}) =>
  GqlClient.getInstance().client.mutate({
    mutation: MUTATION.REGISTER,
    variables: {
      input: {
        firstName, lastName, email, role, password
      }
    },
    fetchPolicy: 'no-cache',
});

export const useVerifyToken = (token) =>
  GqlClient.getInstance().client.query({
    query: QUERY.FETCH_VERIFY_TOKEN,
    variables: { token },
    fetchPolicy: 'no-cache',
});
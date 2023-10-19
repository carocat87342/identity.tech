import * as MUTATION from 'apollo/mutations';
import * as QUERY from 'apollo/queries';
import GqlClient from 'apollo/client';


export const useGetFiles = () =>
  GqlClient.getInstance().client.query({
    query: QUERY.GET_FILES,
    variables: {},
    fetchPolicy: 'no-cache',
});

export const useUpdateUser = (data) =>
  GqlClient.getInstance().client.query({
    query: QUERY.UPDATE_USER,
    variables: {
      input: {
        ...data
      }
    },
    fetchPolicy: 'no-cache',
});

export const useGetEmployees = () =>
  GqlClient.getInstance().client.query({
    query: QUERY.GET_EMPLOYEES,
    variables: {},
    fetchPolicy: 'no-cache',
});

export const useAddEmployee = (data) =>
  GqlClient.getInstance().client.mutate({
    mutation: MUTATION.ADD_EMPLOYEE,
    variables: {
      input: {
        ...data
      }
    },
    fetchPolicy: 'no-cache',
});

export const useUpdateRole = (data) =>
  GqlClient.getInstance().client.mutate({
    mutation: MUTATION.UPDATE_ROLE,
    variables: {
      input: {
        ...data
      }
    },
    fetchPolicy: 'no-cache',
});
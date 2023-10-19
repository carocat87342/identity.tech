import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { getItem } from 'utils/localStorage';
import {ACCESS_TOKEN} from 'utils/constant';

export default class GqlClient {
  client = null;
  accessToken = false;
  static instance = null;

  BASE_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_GRAPHQL_URL_PROD
  : process.env.REACT_APP_ENV === 'staging'
    ? process.env.REACT_APP_GRAPHQL_URL_STAGING
    : process.env.REACT_APP_GRAPHQL_URL_LOCAL
  constructor(accessToken) {
    const headers = {
      authorization: `Bearer ${accessToken || ''}`,
    };
    const client = new ApolloClient({
      uri: this.BASE_URL,
      cache: new InMemoryCache(),
      headers
    });
    this.client = client;
    this.accessToken = accessToken;
    return this;
  }

  static getInstance() {
    const accessToken = getItem(ACCESS_TOKEN);
    if (GqlClient.instance === null) {
      return new GqlClient(accessToken);
    }
    if (GqlClient.instance.accessToken !== accessToken) {
      const instance = new GqlClient(accessToken);
      return instance;
    }
    return GqlClient.instance;
  }
}
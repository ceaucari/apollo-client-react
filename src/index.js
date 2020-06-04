import React from 'react';
import ReactDOM from 'react-dom';

import 'dotenv/config';
import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';

import Routes from './Routes';
import './styles/styles.css';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_API_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_API_URL}`,
  options: {
    reconnect: true,
  },
});

const terminateLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers = { ...headers, 'x-token': token };
    }
    return { headers };
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('### GraphQL error:', message);
    });
  }
  if (networkError) {
    console.log('### Network error', networkError, null, 2);
  }
});

const link = ApolloLink.from([authLink, errorLink, terminateLink]);

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);

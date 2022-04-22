// The src/index.js file

import React from 'react';
import ReactDom from 'react-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import App from './components/App';

require('dotenv').config();

const env = process.env.NODE_ENV;

const url =
  (env === 'production' && `http://localhost:${process.env.PORT}${process.env.API_PATH}`) ||
  `http://localhost:${process.env.PORT}${process.env.API_PATH}`;

const restLink = new RestLink({
  uri: url,
  headers: {
    'Content-Type': 'application/json'
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDom.render(<Root />, document.getElementById('root'));

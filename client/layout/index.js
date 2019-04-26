import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => toast.error(message));
  }
  if (networkError) { toast.error(networkError); }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Layout = ({ children, location }) => (
  <ApolloProvider client={client}>
    {location.pathname === '/login' ? null : <Nav />}
    {children}
    <ToastContainer />
  </ApolloProvider>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;

import React from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      if (path[0] === 'currentUser') { return; }
      toast.error(message);
    });
  }
  if (networkError) { toast.error(networkError); }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
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

import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Nav from './Nav';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const Layout = ({ children, location }) => (
  <ApolloProvider client={client}>
    {location.pathname === '/login' ? null : <Nav />}
    {children}
  </ApolloProvider>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;

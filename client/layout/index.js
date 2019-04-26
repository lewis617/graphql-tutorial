import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Nav from './Nav';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const Layout = ({ children }) => (
  <ApolloProvider client={client}>
    <Nav />
    {children}
  </ApolloProvider>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

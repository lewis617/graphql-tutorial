import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

export default (props) => {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
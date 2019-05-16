const { gql } = require('apollo-server');

module.exports = gql`
  type MyComment{
    rating: Int
    comment: String
    stage: Stage!
  }
  enum Stage{
    never
    want
    reading
    done
  }
`;

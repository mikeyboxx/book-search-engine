import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Query_Me {
    me {
      _id
      username
      email
      password
      bookCount
    }
  }
`;
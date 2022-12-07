const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input SaveBookInput {
    token: String
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    users: [User]
    me(token: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput): User
    removeBook(token: String!, bookId: ID!): User
  }
`;

module.exports = typeDefs;
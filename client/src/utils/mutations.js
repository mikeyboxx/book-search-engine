import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login_User($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Add_User($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Save_Book($input: SaveBookInput) {
    saveBook(input: $input) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Remove_Book($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
    }
  }
`;

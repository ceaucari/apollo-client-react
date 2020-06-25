import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      username
      firstName
      lastName
      email
      role
      createdAt
      messages {
        id
        createdAt
        text
      }
    }
  }
`;

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      firstName
      lastName
      email
      role
      createdAt
      messages {
        id
        createdAt
        text
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
      email
      role
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $firstName: String
    $lastName: String
    $role: String!
  ) {
    updateUser(
      id: $id
      username: $username
      firstName: $firstName
      lastName: $lastName
      role: $role
    ) {
      id
      username
      firstName
      lastName
      email
      role
      createdAt
    }
  }
`;

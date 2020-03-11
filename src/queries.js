import { gql } from "apollo-boost";

export const GET_CONTACTS = gql`
  query {
    contacts {
      id
      name
      lastName
      emailAddress
      contactNumber
    }
  }
`;

export const ADD_CONTACTS = gql`
  mutation addContact(
    $name: String!
    $lastName: String!
    $emailAddress: [String]
    $contactNumber: [String]
  ) {
    addContact(
      name: $name
      lastName: $lastName
      emailAddress: $emailAddress
      contactNumber: $contactNumber
    ) {
      id
      name
      lastName
      emailAddress
      contactNumber
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      name
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact(
    $id: ID!
    $name: String!
    $lastName: String!
    $emailAddress: [String]
    $contactNumber: [String]
  ) {
    updateContact(
      id: $id
      name: $name
      lastName: $lastName
      emailAddress: $emailAddress
      contactNumber: $contactNumber
    ) {
      name
      lastName
    }
  }
`;

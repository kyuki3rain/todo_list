import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation createTodo($id: ID!, $title: String!, $body: String) {
    createTodo(input: { id: $id, title: $title, body: $body, completed: false }) {
      id
      title
      body
    }
  }
`;

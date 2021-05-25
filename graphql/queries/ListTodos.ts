import { gql } from '@apollo/client';

export const ListTodos = gql`
  query ListTodos {
    listTodos {
      items {
        id
        title
        body
      }
    }
  }
`;
import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
    mutation DeleteTodos($id: ID!, $title: String!) {
        deleteTodo(input: {id: $id, title: $title}) {
            id
            title
        }
    }
`;


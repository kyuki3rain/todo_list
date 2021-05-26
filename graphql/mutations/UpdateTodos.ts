import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
    mutation UpdateTodos($id: ID!, $title: String!, $body: String, $completed: Boolean) {
        updateTodo(input: {id: $id, title: $title, body: $body, completed: $completed}) {
            id
            title
            body
            completed
        }
    }
`;


import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Form, Input, Item, Text, Textarea } from 'native-base';
import * as React from 'react';
import { useMutation, gql } from '@apollo/client';
import { StyleSheet } from 'react-native';
import getUniqueStr from '../helpers/getUniqueStr';
import { client } from '../graphql/client';
import { ListTodos } from '../graphql/queries/ListTodos';

const CREATE_TODO = gql`
  mutation createTodo($id: ID!, $title: String!, $body: String) {
    createTodo(input: { id: $id, title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;


export default function CreateTodoScreen() {
  const navigation = useNavigation();
  const [createTodo, _] = useMutation(CREATE_TODO);

  const [title, onChangeTitle] = React.useState("");
  const [body, onChangeBody] = React.useState("");

  return (
    <Container>
      <Content>
        <Form style={styles.container}>
          <Item style={styles.title} regular>
            <Input placeholder="Title" onChangeText={onChangeTitle} value={title} />
          </Item>
          <Textarea style={styles.body} rowSpan={5} bordered placeholder="Body"  onChangeText={onChangeBody} value={body} />
          <Button style={styles.button} block primary
            onPress={async () => {
              const todo = { title, body, id: getUniqueStr() };
              createTodo({ variables: { ...todo } });
              const { listTodos } = client.readQuery({ query: ListTodos });
              const newListTodos = {...listTodos, items: [...listTodos.items, todo]};
              await client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } });
              navigation.goBack();
            }}
          ><Text> create </Text></Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  container: {
    marginHorizontal: 30
  },
  title: {
    marginTop: 20,
  },
  body: {
    marginTop: 20,
  }
});

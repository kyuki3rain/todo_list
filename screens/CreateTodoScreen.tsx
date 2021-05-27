import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Form, Input, Item, Text, Textarea } from 'native-base';
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { client } from '../graphql/client';
import { ListTodos } from '../graphql/queries/ListTodos';
import { Mutation, Query } from '../graphql/generated/graphql';
import { CREATE_TODO } from '../graphql/mutations/CreateTodo';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { UPDATE_TODO } from '../graphql/mutations/UpdateTodos';

export default function CreateTodoScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CreateTodoScreen'>>();
  const [createTodo, _] = useMutation<Mutation>(CREATE_TODO);
  const [updateTodos, _u] = useMutation<Mutation>(UPDATE_TODO);

  const [title, onChangeTitle] = React.useState(params?.todo?.title || "");
  const [body, onChangeBody] = React.useState(params?.todo?.body || "");

  const isUpdate = params?.todo != null;

  const create = (title: string, body: string) => {
    const todo = { title, body, completed: false };
    createTodo({ variables: todo });
    const { listTodos } = client.readQuery<Query>({ query: ListTodos })!;
    const newListTodos = {...listTodos, items: [...listTodos!.items!, todo]};
    client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } });
  }

  const update = (title: string, body: string) => {
    const updated_todo = { ...params?.todo, title, body };
    updateTodos({variables: updated_todo　});
    const { listTodos } = client.readQuery<Query>({ query: ListTodos })!;
    const newListTodos = {...listTodos, items: listTodos?.items?.map((todo) => {
      if(todo?.id === updated_todo.id) { return updated_todo; }
      return todo;
    })};
    client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } , variables: { id: updated_todo.id }});

  }

  return (
    <Container>
      <Content>
        <Form style={styles.container}>
          <Item style={styles.title} regular>
            <Input placeholder="Title" onChangeText={onChangeTitle} value={title} editable={!isUpdate} />
          </Item>
          <Textarea style={styles.body} rowSpan={5} bordered placeholder="Body"  onChangeText={onChangeBody} value={body} />
          <Button style={styles.button} block primary
            onPress={() => {
              isUpdate ? update(title, body) : create(title, body);
              navigation.goBack();
            }}
          ><Text> { isUpdate? "update" : "create" } </Text></Button>
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

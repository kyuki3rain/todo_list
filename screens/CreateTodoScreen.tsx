import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, Form, H2, Header, Input, Item, List, ListItem, Text, Textarea } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TodoListDispatchContext } from '../contexts/providers/TodoListProvider';

export default function CreateTodoScreen() {
  const dispatch = React.useContext(TodoListDispatchContext);
  const navigation = useNavigation();
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
            onPress={() => {
              dispatch({ type: "add", value: { todo: { title, body } } });
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

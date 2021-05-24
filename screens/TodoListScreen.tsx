import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, H2, Header, List, ListItem, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TodoListStateContext } from '../contexts/providers/TodoListProvider';

export default function TodoListScreen() {
  const { todo_list } = React.useContext(TodoListStateContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Content>
        <List>
          {todo_list.map(todo => {
            return (
              <ListItem key={todo.id}>
                <H2>{todo.title}</H2>
              </ListItem>
            );
          })}
        </List>
      </Content>
      <Footer>
        <Content>
          <Button style={styles.button} block primary
            onPress={() => {
              navigation.navigate("CreateTodoScreen");
            }}
          ><Text> create </Text></Button>
        </Content>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  }
});

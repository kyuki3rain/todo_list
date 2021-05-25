import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, H2, Header, List, ListItem, Text } from 'native-base';
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { ListTodos } from '../graphql/queries/ListTodos';

export default function TodoListScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(ListTodos);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;


  return (
    <Container>
      <Content>
        <List>
          {data.listTodos.items.map((todo: Todo) => {
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
          ><Text> new </Text></Button>
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

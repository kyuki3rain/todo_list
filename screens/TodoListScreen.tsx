import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, H2, Header, List, ListItem, Text } from 'native-base';
import * as React from 'react';
import { useQuery } from 'react-apollo';
import { StyleSheet } from 'react-native';
import gql from 'graphql-tag';

const ListTodos = gql`
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

export default function TodoListScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(ListTodos);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


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

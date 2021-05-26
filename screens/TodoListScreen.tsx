import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, Icon, SwipeRow, Text } from 'native-base';
import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListTodos } from '../graphql/queries/ListTodos';
import { DELETE_TODO } from '../graphql/mutations/DeleteTodos';
import { client } from '../graphql/client';
import { Todo } from '../graphql/generated/graphql';

export default function TodoListScreen() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(ListTodos);
  const [deleteTodos, _] = useMutation(DELETE_TODO);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <Container>
      <Content style={{flex: 1}}>
        <FlatList
          data={data.listTodos.items}
          renderItem={({item}) => <SwipeRow
            rightOpenValue={-75}
            body={
              <View>
                <Text style={{ paddingLeft: 15 }}>{item.title}</Text>
              </View>
            }
            right={
              <Button danger onPress={() => {
                deleteTodos({variables: { id: item.id, title: item.title }});
                const { listTodos } = client.readQuery({ query: ListTodos });
                const newListTodos = {...listTodos, items: listTodos.items.filter((todo: Todo) => todo.id !== item.id)};
                client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } });
              }}>
                <Icon active name="trash" />
              </Button>
            }
          />}
        />
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

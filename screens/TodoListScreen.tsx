import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, Icon, SwipeRow, Text } from 'native-base';
import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListTodos } from '../graphql/queries/ListTodos';
import { DELETE_TODO } from '../graphql/mutations/DeleteTodos';
import { client } from '../graphql/client';
import { Mutation, Query } from '../graphql/generated/graphql';
import { UPDATE_TODO } from '../graphql/mutations/UpdateTodos';

export default function TodoListScreen() {
  const navigation = useNavigation();
  const { loading, error, data, refetch } = useQuery<Query>(ListTodos);
  const [deleteTodos, _d] = useMutation<Mutation>(DELETE_TODO);
  const [updateTodos, _u] = useMutation<Mutation>(UPDATE_TODO);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }

  return (
    <Container>
      <FlatList
        data={data!.listTodos?.items}
        renderItem={({item}) => {
          if (!item) {return null;}
          return <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button primary onPress={() => {
                const completed = (item.completed) ? !item.completed : true;
                updateTodos({variables: { ...item, completed: completed }});
                const { listTodos } = client.readQuery<Query>({ query: ListTodos })!;
                const newListTodos = {...listTodos, items: listTodos?.items?.map((todo) => {
                  if(todo?.id === item.id) {return {...todo, completed: completed }}
                  return todo;
                })};
                client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } , variables: { id: item.id }});
              }}>
                <Icon active name="checkmark" />
              </Button>
            }
            body={
              <TouchableOpacity style={{ flexDirection: 'row', height: 20, width: "100%" }} onPress={() => {
                navigation.navigate("CreateTodoScreen", { todo: item });
              }}>
                <Text style={{ paddingLeft: 15}}>{item.title}</Text>
                {item.completed && <Icon style={{ paddingLeft: 10, fontSize: 18}} name="checkmark-circle" />}
              </TouchableOpacity>
            }
            right={
              <Button danger onPress={() => {
                deleteTodos({variables: { id: item.id, title: item.title }});
                const { listTodos } = client.readQuery<Query>({ query: ListTodos })!;
                const newListTodos = {...listTodos, items: listTodos?.items?.filter((todo) => todo?.id !== item.id)};
                client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } });
              }}>
                <Icon active name="trash" />
              </Button>
            }
            key={item.id}
          />;
        }}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
      />
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

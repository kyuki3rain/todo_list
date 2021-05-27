import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Footer, Icon, SwipeRow, Text } from 'native-base';
import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListTodos } from '../graphql/queries/ListTodos';
import { DELETE_TODO } from '../graphql/mutations/DeleteTodos';
import { client } from '../graphql/client';
import { Mutation, Query } from '../graphql/generated/graphql';
import { UPDATE_TODO } from '../graphql/mutations/UpdateTodos';
import { Auth } from 'aws-amplify';
import { UserDispatchContext, UserStateContext } from '../contexts/providers/UserProvider';


export default function TodoListScreen() {
  const navigation = useNavigation();
  const { loading, error, data, refetch } = useQuery<Query>(ListTodos);
  const [deleteTodos, _d] = useMutation<Mutation>(DELETE_TODO);
  const [updateTodos, _u] = useMutation<Mutation>(UPDATE_TODO);
  const userDispatch = React.useContext(UserDispatchContext); 
  const userState = React.useContext(UserStateContext);

  console.log(userState);

  if (!userState.loggedIn){
    navigation.navigate("SignInScreen");
    return <View></View>;
  }
  
  async function signOut() {
    try {
      await Auth.signOut();
      userDispatch({type: "logout"});
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

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
                client.writeQuery({ query: ListTodos, data: { listTodos: newListTodos } , variables: { userId: item.id }});
              }}>
                <Icon active name="checkmark" />
              </Button>
            }
            body={
              <View style={{ flexDirection: 'row', height: 20 }}>
                <Text style={{ paddingLeft: 15}}>{item.title}</Text>
                {item.completed && <Icon style={{ paddingLeft: 10, fontSize: 18}} name="checkmark-circle" />}
              </View>
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
      <Button style={styles.button} block primary
        onPress={() => {
          navigation.navigate("CreateTodoScreen");
        }}
      ><Text> new </Text></Button>
      <Footer>
        <Content>
          <Button style={styles.button} block danger
            onPress={signOut}
          ><Text> sign out </Text></Button>
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

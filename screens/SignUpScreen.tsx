import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Form, Input, Item, Text, Textarea } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { UserDispatchContext } from '../contexts/providers/UserProvider';

export default function CreateTodoScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userDispatch = React.useContext(UserDispatchContext); 

  async function signUp() {
    try {
      const { user } = await Auth.signUp({ username, password });
      console.log(user);
      userDispatch({type: "login", value: { user }});
      navigation.navigate("TodoListScreen");
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  return (
    <Container>
      <Content>
        <Form style={styles.container}>
          <Item style={styles.title} regular>
            <Input placeholder="Username" onChangeText={setUsername} value={username} />
          </Item>
          <Item style={styles.title} regular>
            <Input placeholder="Password" onChangeText={setPassword} value={password} />
          </Item>
          <Button style={styles.button} block primary onPress={signUp}>
            <Text> sign in </Text>
          </Button>
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

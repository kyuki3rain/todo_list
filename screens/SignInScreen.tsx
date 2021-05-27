import Amplify, { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/core';
import { Button, Container, Content, Form, Input, Item, Text, Textarea } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { UserDispatchContext, UserStateContext } from '../contexts/providers/UserProvider';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-northeast-1:b14407eb-dfa7-4c7a-94ce-211915827791',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-northeast-1',
    }
});

export default function SignInScreen() {
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

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      userDispatch({type: "login", value: { user }});
      navigation.navigate("TodoListScreen");
    } catch (error) {
      console.log('error signing in', error);
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
          <Button style={styles.button} block primary onPress={signIn}>
            <Text> sign in </Text>
          </Button>
          <Button style={styles.button} block primary onPress={signUp}>
            <Text> sign up </Text>
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

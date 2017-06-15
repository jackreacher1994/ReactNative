import React, { Component, } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import firebaseApp from '../FirebaseConfig';

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: null,
        password: null
      };
  }

  login() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            Alert.alert(
                'Notification',
                'Successfully Logined!',
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
                ],
                { cancelable: false }
            );
            this.setState({
                email: null,
                password: null
            });
        })
        .catch((error) => {
            Alert.alert(
                'Notification',
                'Fail Logined!',
                [
                    {text: 'OK', onPress: (f) => f},
                ],
                { cancelable: false }
            );
            this.setState({
                password: null
            });
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(input) => this.setState({email: input})} value={this.state.email} />
        <TextInput style={styles.input} onChangeText={(input) => this.setState({password: input})} value={this.state.password} secureTextEntry={true} />
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 10,
    width: 300
  },
  button: {
      backgroundColor: 'green',
      padding: 20,
      margin: 20
  }
});

export default Login;
import React, { Component, } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import firebaseApp from '../FirebaseConfig';

class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: null,
        password: null
      };
  }

  register() {
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            Alert.alert(
                'Notification',
                'Successfully Registered!',
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: false }
            );
            this.setState({
                email: null,
                password: null
            });
        })
        .catch(function(error) {
        
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(input) => this.setState({email: input})} value={this.state.email} />
        <TextInput style={styles.input} onChangeText={(input) => this.setState({password: input})} value={this.state.password} secureTextEntry={true} />
        <TouchableOpacity style={styles.button} onPress={this.register.bind(this)}>
            <Text>Register</Text>
        </TouchableOpacity>
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
      padding: 20
  }
});

export default Register;
import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';

const AppStack = StackNavigator({
    LoginScreen: {
        screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    },
    RegisterScreen: {
        screen: Register,
        navigationOptions: {
            title: 'Register'
        }
    },
    WelcomeScreen: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    }
});

export default AppStack;
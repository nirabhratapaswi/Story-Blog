/**
 * LoginScreen.js
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Icon
} from 'native-base';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import { NavigationOpenButton, } from '../navigation/NavigationButtons';
import env from '../../env';
import { Auth } from '../services/AuthService';

class nullComp extends Component {
  render() {
    return (
      null
    );
  }
}

class LoginLogout extends Component {

  constructor() {
    super();
    this.state = {
      username: "admin97",
      password: "",
      login_warning: "",
      username_warning: "",
      password_warning: "",
      login_disabled: false,
      server_url: env.config.server_url.toString(),
      Auth: new Auth(),
    }
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    console.log("this.Auth: ", this.state.Auth);
  }

  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('checked_logged_in') != 'true' ) {
      let auth = new Auth();
      auth.isLoggedIn()
        .then(logged_in => {
          console.log("Logged in status recieved: ", logged_in);
          if (logged_in) {
            navigation.setParams({'title': 'Logout', 'drawer_label': 'Logout', 'checked_logged_in': 'true'});
            navigation.navigate('Stories');
          }
        })
        .catch(err => {
          console.error("Error in LoginScreen navigationOptions: ", err);
        });
        return {
          title: navigation.getParam('title', 'Login'),
          drawerIcon: ({tintColor}) => (
            <Icon type='Entypo' name='login' style={{ fontSize: 24, color: tintColor }} />
          )
        }
    } else {
      return {
        title: navigation.getParam('title', 'Login'),
        drawerIcon: ({tintColor}) => (
          <Icon type='Entypo' name='login' style={{ fontSize: 24, color: tintColor }} />
        )
      }
    }
  };

  async loginUser() {

    let empty_fields = false;
    
    if (this.state.username == "") {
      this.setState({
        username_warning: "* Username cannot be empty"
      });
      empty_fields = true;
    }
    if (this.state.password == "") {
      this.setState({
        password_warning: "* Password cannot be empty"
      });
      empty_fields = true;
    }
    if (empty_fields) {
      return;
    }
    this.setState({
      login_disabled: true
    });

    this.state.Auth.loginUser(this.state.username, this.state.password, (resp) => {
      if (resp.success) {
        this.setState(resp);
        this.props.navigation.setParams({'title': 'Logout', 'drawer_label': 'Logout'});
        this.props.navigation.navigate('Stories');
        return;
      }
      this.setState(resp);
    })
      .catch(err => {
        console.error("Error in loginUser LoginScreen.", err);
      });

  }

  async logoutUser() {
    this.state.Auth.clearLoggedInVariables()
      .then(resp => {
        console.log("Successful response: ", resp);
        this.props.navigation.setParams({
          'title': 'Login',
          'drawer_label': 'Login'
        });
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.error("Error in logoutUser LoginScreen: ", err)
      });
  }

  render() {
    if (this.props.navigation.getParam('drawer_label') == 'Logout') {
      return (
        <View style={[styles.container, styles.logoutContainer]}>
          <Button
            leftIcon={{ type:"entypo", name: 'log-out' }}
            title="Confirm Logout"
            backgroundColor='red'
            onPress={this.logoutUser}
            disabled={this.state.logout_disabled}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Login" />
          <FormValidationMessage>{this.state.login_warning}</FormValidationMessage>
          <FormLabel>Username</FormLabel>
          <FormInput onChangeText={newText => this.setState({username: newText})} value={this.state.username} inputStyle={styles.input} />
          <FormValidationMessage>{ this.state.username_warning }</FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <TextInput secureTextEntry={true} onChangeText={newText => this.setState({password: newText})} value={this.state.password} style={[styles.input, styles.inputText]} />
          <FormValidationMessage>{ this.state.password_warning }</FormValidationMessage>
          <Button
            leftIcon={{ type:"entypo", name: 'login' }}
            title="Login"
            backgroundColor='blue'
            onPress={this.loginUser}
            disabled={this.state.login_disabled}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'black',
    borderRadius: 2,
    fontSize: 20,
  },
  inputText: {
    padding: 10,
    margin: 15,
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export {
  LoginLogout
};

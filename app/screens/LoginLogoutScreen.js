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
import AuthService from '../services/AuthService';

class LoginLogout extends Component {

  constructor() {
    super();
    this.state = {
      username: "admin97",
      password: "tardis",
      login_warning: "",
      username_warning: "",
      password_warning: "",
      login_disabled: false,
      server_url: env.config.server_url.toString(),
    }
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    if (!screenProps.auth.logged_in) {
      return {
        title: 'Login',
        drawerIcon: ({tintColor}) => (
          <Icon type='Entypo' name='login' style={{ fontSize: 24, color: tintColor }} />
        )
      }
    } else {
      return {
        title: 'Logout',
        drawerIcon: ({tintColor}) => (
          <Icon type='Entypo' name='log-out' style={{ fontSize: 24, color: tintColor }} />
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

    AuthService.loginUser(this.state.username, this.state.password)
      .then(resp => {
        this.setState(resp);
        if (resp.success) {
          // this.props.navigation.setParams({'title': 'Logout', 'drawer_label': 'Logout'});
          this.props.screenProps.updateLoggedInStatus(true);
          this.props.navigation.navigate('Stories');
          return;
        }
      })
      .catch(err => {
        console.error("Error in loginUser LoginScreen.", err);
      });

  }

  async logoutUser() {
    AuthService.logoutUser(this.props.screenProps.updateLoggedInStatus)
      .then(success => {
        console.log("Logout confirm in LoginLogoutScreen: ", success);
        this.props.navigation.setParams({
          'title': 'Login',
          'drawer_label': 'Login'
        });
        // this.props.screenProps.updateLoggedInStatus(false);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.error("Error in logoutUser LoginScreen: ", err)
      });
  }

  render() {
    if (this.props.screenProps.auth.logged_in) {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Logout" />
          <View style={styles.logoutContainer}>
            <Button
              leftIcon={{ type:"entypo", name: 'log-out' }}
              title="Confirm Logout"
              backgroundColor='red'
              onPress={this.logoutUser}
              disabled={this.state.logout_disabled}
            />
          </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export {
  LoginLogout
};

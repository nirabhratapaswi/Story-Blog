import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import {
  Header,
  Left,
  Right,
  Icon
} from 'native-base';
import { NavigationOpenButton } from '../../navigation/NavigationButtons';

import { Profile } from './ProfileScreen';
import { Account } from './AccountScreen';
import { Null } from '../NullScreen';

const TabNavigator = createBottomTabNavigator({
  Profile: Profile,
  Account: Account,
}, {
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

const AuthenticatedNavigator = createAppContainer(TabNavigator);

class Authenticated extends Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    if (!screenProps.auth.logged_in) {
      return {
        drawerLabel: () => {
          return (
            <Null />
          )
        },
        drawerIcon: () => {
          return (
            <Null />
          )
        }
      }
    } else {
      return {
        title: 'Settings',
        drawerIcon: ({tintColor}) => (
          <Icon name='settings' style={{ fontSize: 24, color: tintColor }} />
        )
      }
    }
  };

  render() {
    console.log("Props in Authenticated: ", this.props);
    if (this.props.screenProps.auth.logged_in) {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Settings" navigation={this.props.navigation} />
          <AuthenticatedNavigator screenProps={this.props.screenProps} />
        </View>
      );
    } else {
      return (
        <Null />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {
  Authenticated,
}

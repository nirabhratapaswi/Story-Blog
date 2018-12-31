/**
 * ProfileScreen.js
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Subtitle,
} from 'native-base';
import { NavigationOpenButton } from '../../navigation/NavigationButtons';

import { Null } from '../NullScreen';

class Profile extends Component {

  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <Icon type="MaterialCommunityIcons" name="face-profile" style={{ fontSize: 24, color: tintColor }} />
      );
    },
  });

  render() {
    if (this.props.screenProps.auth.logged_in) {
      return (
        <View style={styles.container}>
          <View style={styles.pageContent}>
            <Text>Welcome to Profile</Text>
          </View>
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
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export {
  Profile,
};

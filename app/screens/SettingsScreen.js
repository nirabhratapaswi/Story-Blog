/**
 * SettingsScreen.js
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
import { NavigationOpenButton } from '../navigation/NavigationButtons';

class Settings extends Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationOpenButton title="Settings" navigation={this.props.navigation} />
        <View style={styles.pageContent}>
          <Text>Welcome to Settings</Text>
        </View>
      </View>
    );
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

export default Settings;

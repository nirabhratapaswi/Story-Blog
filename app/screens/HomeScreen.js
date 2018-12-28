/**
 * HomeScreen.js
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
  Icon
} from 'native-base';
import { NavigationOpenButton } from '../navigation/NavigationButtons';

class Home extends Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationOpenButton title="Home" />
        <View style={styles.pageContent}>
          <Text>Welcome to Home</Text>
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
  },
});

export default Home;

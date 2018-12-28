/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationMain from './navigation/NavigationMain';

class Main extends Component {
  render() {
    return (
      <NavigationMain />
    );
  }
}

const styles = StyleSheet.create({
});

export default Main;

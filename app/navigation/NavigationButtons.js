/**
 * NavigationButton.js
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  SubTitle
} from 'native-base';

const title = "Hello";
const subtitle = "World";


class NavigationOpenButton extends Component {
  constructor() {
    super();
  }

  render() {
    console.log("NavigationOpenButton called, ", this.props);
    return (
      <Header>
        <Left>
            <Icon name="menu" onPress={() => {
              this.props.navigation.openDrawer()
            }} />
          </Left>
          <Body>
            <Title>{this.props.title ? this.props.title.toString() : "Undefined"}</Title>
          </Body>
          <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export {
  NavigationOpenButton
};

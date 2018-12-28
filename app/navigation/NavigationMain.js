/**
 * 
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer
} from 'react-navigation';
import {
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  SubTitle
} from 'native-base';
const { width } = Dimensions.get('window')

import Home from '../screens/HomeScreen'
import Settings from '../screens/SettingsScreen'
import { Stories, StoriesDetail } from '../screens/StoriesScreen'

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.image_container}>
      <Image source={require('../static/images/react_js.png')} style={styles.image} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Settings: {
    screen: Settings
  },
  Stories: {
    screen: Stories
  },
  StoriesDetail: {
    screen: StoriesDetail
  }
}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: width*0.8,
  contentOptions: {
    activeTintColor: 'orange'
  },
  initialRouteName: 'Stories'
});

const Navigator = createAppContainer(DrawerNavigator);

class NavigationMain extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_container: {
    height: 120,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  }
});

export default NavigationMain;

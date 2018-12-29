/**
 * StoriesScreen.js
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
  SubTitle
} from 'native-base';
import { NavigationOpenButton } from '../navigation/NavigationButtons';
import env from '../../env';

import { StoryList } from './ListScreen';
import { Auth } from '../services/AuthService';

class Stories extends Component {

  constructor() {
    super();
    this.state = {
      // server_url: env.config.server_url.concat(":", env.config.port.toString())
      server_url: env.config.server_url.toString()
    }
    this.getStories = this.getStories.bind(this);
    this.Auth = new Auth();
    this.Auth.getLoggedInVariables()
      .then(resp => {
        console.log("Logged in variables: ", resp);
      })
      .catch(err => {
        console.error("Error occurred in Stories Screen: ", err);
      });
    this.Auth.clearLoggedInVariables();
  }

  getStories(updateStories) {
    fetch(this.state.server_url.concat('/stories'), {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log("Successful request: ", response);
        if (response != null || typeof(response) != Array) {
          stories_arr = [];
          stories_arr = response.map((story, index) => {
            story.authors = story.authors.toString();
            return story;
          });
          updateStories(stories_arr);
        } else {
          updateStories([]);
        }
      })
      .catch(error => {
        console.log("Request failed:", error);
        updateStories([]);
      });
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="MaterialCommunityIcons" name="file-document-box-multiple-outline" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationOpenButton title="Stories" navigation={this.props.navigation} />
        <View style={styles.pageContent}>
          <StoryList getStories={this.getStories} />
        </View>
      </View>
    );
  }
}

class StoriesDetail extends Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="Entypo" name="text-document" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationOpenButton title="Detailed Story" navigation={this.props.navigation} />
        <View style={styles.pageContent}>
          <Text>Welcome to Stories Detail</Text>
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

export {
  Stories,
  StoriesDetail
};

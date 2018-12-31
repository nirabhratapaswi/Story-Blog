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
import AuthService from '../services/AuthService';
import StoriesService from '../services/StoriesService';

const SERVER_URL = (env.config.port != "") ? env.config.server_url.toString().concat(":", env.config.port.toString()) : env.config.server_url.toString();

class StoriesDetail extends Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="Entypo" name="text-document" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pageContent}>
          <Text>{this.props.story.text}</Text>
        </View>
      </View>
    );
  }
}

class Stories extends Component {

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="MaterialCommunityIcons" name="file-document-box-multiple-outline" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  constructor() {
    super();
    this.state = {
      story: null,
      single_story_mode: false
    };
    this.getStory = this.getStory.bind(this);
  }

  getStory(story_id) {
    console.log("Story id to fetch: ", story_id);
    StoriesService.getStory(story_id)
      .then(story => {
        console.log("Story recieved by StoriesScreen: ", story);
        this.setState({
          story: story,
          single_story_mode: true,
        });
      })
      .catch(err => {
        console.error("Error in getStory of StoriesScreen: ", err)
      });
  }

  render() {

    console.log("Props recieved by StoriesScreen: ", this.props);

    if (this.state.single_story_mode) {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Story" navigation={this.props.navigation} />
          <View style={styles.pageContent}>
            <StoriesDetail story={this.state.story} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Stories" navigation={this.props.navigation} />
          <View style={styles.pageContent}>
            <StoryList onPressItem={this.getStory} getStories={StoriesService.getStories} getStory={this.getStory} />
          </View>
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
  }
});

export {
  Stories,
  StoriesDetail
};

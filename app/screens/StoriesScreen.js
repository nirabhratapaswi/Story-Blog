/**
 * StoriesScreen.js
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
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
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.story_title}>{this.props.story.title.toString()}</Text>
            <Text note style={styles.story_authors}> - {this.props.story.authors.toString()}</Text>
            <Text style={styles.story_text}>{this.props.story.text.toString()}</Text>
          </ScrollView>
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
      single_story_mode: false,
      stories: []
    };
    this.getStory = this.getStory.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    StoriesService.getStories()
      .then(stories => {
        this.setState({
          stories: stories,
        })
      })
      .catch(err => {
        console.error("Error in StoriesScreen constructor: ", err)
      });
  }

  componentWillMount() {
    console.log("Stories mounted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    console.log("Stories unmounted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      // this.props.navigation.goBack(null);
      console.log("Back button pressed!!");
      if (!this.state.single_story_mode) {
        return this.props.navigation.navigate('Home');
      }
      this.setState({
        single_story_mode: false,
      });
      return true;
  }

  getStory(story_id) {
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

  onPressLikeItem(story_id) {
    console.log("Like pressed for: ", story_id);
  }

  render() {

    console.log("Props recieved by StoriesScreen: ", this.props);

    if (this.state.single_story_mode) {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Story" navigation={this.props.navigation} />
          <StoriesDetail story={this.state.story} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationOpenButton title="Stories" navigation={this.props.navigation} />
          <View style={styles.pageContent}>
            <StoryList onPressLikeItem={this.onPressLikeItem} onPressItem={this.getStory} stories={this.state.stories} getStories={StoriesService.getStories} getStory={this.getStory} />
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  story_title: {
    fontSize: 40,
    fontWeight: '900',
  },
  story_authors: {
    fontSize: 14,
    fontWeight: '200',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  story_text: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  }
});

export {
  Stories,
  StoriesDetail
};

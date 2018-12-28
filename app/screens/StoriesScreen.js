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

const stories = [{
  "authors": "Nirabhra Tapaswi",
  "title": "Origin",
  "text": "God is dead, AI will rule the future, with a symbiogenesis with humans.",
}, {
  "authors": "Nirmalya Tapaswi",
  "title": "Deception Point",
  "text": "NASA has proved its worth, proved existance of extraterrestrial life.",
}, {
  "authors": "Navamita Tapaswi",
  "title": "Chamber of Secrets",
  "text": "Tom Marvolo Riddle: I am Lord Voldemort.",
}, {
  "authors": "Nirabhra Tapaswi",
  "title": "Origin",
  "text": "God is dead, AI will rule the future, with a symbiogenesis with humans.",
}, {
  "authors": "Nirmalya Tapaswi",
  "title": "Deception Point",
  "text": "NASA has proved its worth, proved existance of extraterrestrial life.",
}, {
  "authors": "Navamita Tapaswi",
  "title": "Chamber of Secrets",
  "text": "Tom Marvolo Riddle: I am Lord Voldemort.",
}, {
  "authors": "Nirabhra Tapaswi",
  "title": "Origin",
  "text": "God is dead, AI will rule the future, with a symbiogenesis with humans.",
}, {
  "authors": "Nirmalya Tapaswi",
  "title": "Deception Point",
  "text": "NASA has proved its worth, proved existance of extraterrestrial life.",
}, {
  "authors": "Navamita Tapaswi",
  "title": "Chamber of Secrets",
  "text": "Tom Marvolo Riddle: I am Lord Voldemort.",
}, {
  "authors": "Nirabhra Tapaswi",
  "title": "Origin",
  "text": "God is dead, AI will rule the future, with a symbiogenesis with humans.",
}, {
  "authors": "Nirmalya Tapaswi",
  "title": "Deception Point",
  "text": "NASA has proved its worth, proved existance of extraterrestrial life.",
}, {
  "authors": "Navamita Tapaswi",
  "title": "Chamber of Secrets",
  "text": "Tom Marvolo Riddle: I am Lord Voldemort.",
}];


class Stories extends Component {

  constructor() {
    super();
    this.server_url = env.config.server_url.concat(":", env.config.port.toString());
    console.log(this.server_url, "http://ba35d031.ngrok.io/stories");
    this.stories = [];
  }

  getStories(updateStories) {
    console.log("GetStories called check--------------------------------");
    fetch('http://ba35d031.ngrok.io/stories', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log("Successful request: ", response);
        if (response != null || typeof(response) != Array) {
          stories_arr = [];
          for (let i=0; i<response.length; i++) {
            let story = response[i];
            story.authors = story.authors.toString();
            stories_arr.push(story);
          }
          /*this.stories = response.map((story, index) => {
            // story.authors = story.authors.toString();
            return story;
          });*/
          console.log("Stories", stories_arr);
          updateStories(stories_arr);
        } else {
          updateStories([]);
        }
      })
      .catch(error => {
        console.log("Request failed:", error);
        updateStories([]);
      })
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="MaterialCommunityIcons" name="file-document-box-multiple-outline" style={{ fontSize: 24, color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationOpenButton title="Stories" />
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
        <NavigationOpenButton title="Detailed Story" />
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

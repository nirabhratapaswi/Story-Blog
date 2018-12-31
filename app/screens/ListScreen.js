/**
 * StoriesScreen.js
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  SubTitle,
  List,
  ListItem,
} from 'native-base';

const { width } = Dimensions.get('window');

function getWidth(width, percentage) {
  if (!percentage) {
    return width;
  } else {
    return width * percentage / 100;
  }
}

const ListRenderItem = ({item}) => {
  console.log("Rendering: ", item);
  return (
    <View>
      <Text style={styles.story_title}>{item.story_title.toString()}</Text>
      <Text note>{item.authors.toString()}</Text>
      <Text>{item.text.toString()}</Text>
    </View>
  );
}

class MyListItem extends React.PureComponent {
  _onPress = () => {
    console.log("Pressed: ", this.props.id);
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.item}>
        <View>
          <Text style={styles.header_text}>{this.props.story.title.toString()}</Text>
          <Text note>{this.props.story.authors.toString()}</Text>
          <Text>{this.props.story.text.toString()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class StoryList extends Component {

  constructor() {
    super();
    this.state = {
      stories: [],
      response: false
    };
    this.updateStories = this.updateStories.bind(this);
    this.getStory = this.updateStories.bind(this);
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({item}) => {
    return (
      <MyListItem
        id={item._id}
        onPressItem={this._onPressItem}
        story={item}
      />
    );
  }

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.props.onPressItem(id);
  };

  updateStories(stories) {
    this.setState({
      stories: stories,
      response: true
    });
  }

  getStory(story) {
    console.log("Clicked on story: ", story);
  }

  render() {

    if (this.props.getStories && !this.state.response) {
      this.props.getStories(this.updateStories);
    }

    return (
      <Container style={styles.container}>
        <FlatList
          data={this.state.stories}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: getWidth(width)
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_text: {
    fontSize: 30,
    fontWeight: '900',
  },
  story_title: {
    fontSize: 20,
    fontWeight: '900',
  },
  story_authors: {
    fontSize: 10,
    fontWeight: '200',
  },
  story_text: {
    fontSize: 15,
    fontWeight: '500',
  },
  item: {
    width: getWidth(width),
    borderStyle: 'solid',
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    marginTop: 2,
    padding: 10,
  }
});

export {
  StoryList,
};

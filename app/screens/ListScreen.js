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

import AuthService from '../services/AuthService';

const { width } = Dimensions.get('window');

function getWidth(width, percentage) {
  if (!percentage) {
    return width;
  } else {
    return width * percentage / 100;
  }
}

class MyListItem extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      like_icon: {
        color: 'black',
      },
    }
  }

  _onPress = () => {
    console.log("Pressed: ", this.props.id);
    this.props.onPressItem(this.props.id);
  };

  _onPressLike = () => {
    console.log("Pressed Like for story id: ", this.props.id);
    this.setState({
      like_icon: {
        color: (this.state.like_icon.color == 'black') ? 'red' : 'black',
      }
    })
    this.props.onPressLikeItem(this.props.id);
  };

  render() {
    if (this.props.screenProps.auth.logged_in) {
      return (
        <TouchableOpacity onPress={this._onPress} style={styles.item}>
          <View>
            <Left></Left>
            <Body>
              <Text style={styles.header_text}>{this.props.story.title.toString()}</Text>
              <Text note> - {this.props.story.authors.toString()}</Text>
            </Body>
            <View style={styles.right}>
              <Icon type="AntDesign" name="like1" onPress={this._onPressLike} style={this.state.like_icon} />
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this._onPress} style={styles.item}>
          <View>
            <Left></Left>
            <Body>
              <Text style={styles.header_text}>{this.props.story.title.toString()}</Text>
              <Text note> - {this.props.story.authors.toString()}</Text>
            </Body>
          </View>
        </TouchableOpacity>
      );
    }
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
        onPressLikeItem={this._onPressLikeItem}
        story={item}
        screenProps={this.props.screenProps}
      />
    );
  }

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.props.onPressItem(id);
  };

  _onPressLikeItem = (id: string) => {
    this.props.onPressLikeItem(id);
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
    return (
      <Container style={styles.container}>
        <FlatList
          data={this.props.stories}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          extraData={{
            screenProps: this.props.screenProps
          }}
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
  },
  right: {
    alignItems: 'flex-end'
  }
});

export {
  StoryList,
};

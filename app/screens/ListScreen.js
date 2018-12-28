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

class StoryList extends Component {

  constructor() {
    super();
    this.updateStories = this.updateStories.bind(this);
    this.state = {
      stories: [],
      response: false
    };
  }

  updateStories(stories) {
    this.setState({
      stories: stories,
      response: true
    });
  }

  render() {

    if (this.props.getStories && !this.state.response) {
      this.props.getStories(this.updateStories);
    }

    return (
      <Container style={{ width: getWidth(width) }}>
        <Header style={styles.header}>
          <Text style={styles.header_text}>Latest Stories</Text>
        </Header>
        <Content>
          <List>
            { this.state.stories.map((story, index) => {
                  return (
                    <ListItem key={index}>
                      
                      <Body>
                        <Text style={styles.story_title}>{ story.title.toString() }</Text>
                        <Text note>{ story.authors.toString() }</Text>
                        <Text>{ story.text.toString() }</Text>
                      </Body>
                      <Right></Right>
                    </ListItem>
                  )
                })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

export {
  StoryList,
};

import {
    AsyncStorage
} from "react-native";

import Main from '../Main';
import env from '../../env';
import {
    User,
    Auth,
} from '../utils/Interfaces';

const SERVER_URL = (env.config.port != "") ? env.config.server_url.toString().concat(":", env.config.port.toString()) : env.config.server_url.toString();

class StoriesService {
	static stories = [];

	static async getStory(story_id) {
		return fetch(SERVER_URL.concat('/stories/getOne/', story_id.toString()), {
			    method: 'GET',
			    headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			    },
			})
			.then(response => response.json())
			.then(story => {
			    console.log("Story details in Stories Service getStory: ", story);
			    return story;
			})
			.catch(err => {
			    console.error("Error in confirmLoggedIn(AuthService.js): ", err);
			    return null;
			});
	}

	static async getStories(updateStories) {
		return fetch(SERVER_URL.concat('/stories'), {
				method: 'GET'
			})
			.then(response => response.json())
			.then(response => {
				console.log("Response by stories fetch: ", response);
				if (response != null || typeof(response) != Array) {
					let stories_arr = [];
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
}

export default StoriesService;

import {
    AsyncStorage
} from "react-native";

import Main from '../Main';
import env from '../../env';
import {
    User,
    Auth,
} from '../utils/Interfaces';
import AuthService from './AuthService';

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

    static async getStories() {
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
                    return stories_arr;
                } else {
                    return [];
                }
            })
            .catch(error => {
                console.log("Request failed:", error);
                return [];
            });
    }

    static async likeStory(story_id) {
        AuthService.getLoggedInVariables()
            .then(logged_in_variables => {
            	console.log("Logged in variables in StoriesService: ", logged_in_variables);
                if (logged_in_variables.success) {
                    return fetch(SERVER_URL.concat('/stories/like/'.concat(story_id)), {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': logged_in_variables.jwt
                            },
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log("Response by stories fetch: ", response);
                           	return response.success;
                        })
                        .catch(error => {
                            console.log("Request failed:", error);
                            return false;
                        });
                }

                return false;
            })
            .catch(err => {
                console.error("Error in likeStory of StoriesService: ", err);
                return false;
            });
    }
}

export default StoriesService;
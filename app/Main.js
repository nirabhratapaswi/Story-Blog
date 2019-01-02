/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { NavigationMain } from './navigation/NavigationMain';

import {
	User,
	Auth,
} from './utils/Interfaces';
import AuthService from './services/AuthService';

class Main extends Component {

	constructor() {
		super();
		this.state = {
			logged_in: false,
		};
		this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
		AuthService.confirmLoggedIn()
			.then(is_logged_in => {
				console.log("Confirmed login, is_logged_in: ", is_logged_in);
				if (is_logged_in) {
					this.updateLoggedInStatus(true);
				} else {
					AuthService.setLoggedInVariables(false, "");
				}
			})
			.catch(err => {
				console.error("Error in Main js constructor: ", err);
			});
	}

	updateLoggedInStatus(value, jwt=null) {
		Auth.update({
			logged_in: value,
			jwt: jwt,
		});
		this.setState({
			logged_in: value,
		});
	}

	render() {
		console.log("Re rendering Main.js");
		return (
			<NavigationMain auth={Auth.getAuth()} updateLoggedInStatus={this.updateLoggedInStatus} />
		);
	}
}

const styles = StyleSheet.create({
});

export default Main;

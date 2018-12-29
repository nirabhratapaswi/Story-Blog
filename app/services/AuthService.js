import { AsyncStorage } from "react-native";
import env from '../../env';

class Auth {

  constructor() {
    this.is_logged_in = false;
    this.jwt = null;
    this.state = {
      server_url: env.config.server_url.toString(),
    };
  }

  async setLoggedInVariables(is_logged_in, jwt) {
    try {
      if (typeof(is_logged_in) == typeof("string") && typeof(jwt) == typeof("string")) {
        this.is_logged_in = is_logged_in;
        this.jwt = jwt;
        await AsyncStorage.setItem('is_logged_in', is_logged_in);
        await AsyncStorage.setItem('jwt', jwt);
        console.log("Set logged in variables!!!!!");
        return true;
      }
      console.log("jwt type: ", typeof(jwt), ", jwt: ", jwt);
      console.log("is_logged_in type: ", typeof(is_logged_in), ", is_logged_in: ", is_logged_in);
      return false;
    } catch (e) {
      console.log("Error occurred in AsyncStorage: ", e);
      return false;
    }
  }

  async clearLoggedInVariables() {
    try {
      await AsyncStorage.removeItem('is_logged_in');
      await AsyncStorage.removeItem('jwt');
      return true;
    } catch (e) {
      console.log("Error occurred in AsyncStorage: ", e);
      return false;
    }
  }

  async getLoggedInVariables() {
    try {
      let is_logged_in = await AsyncStorage.getItem('is_logged_in');
      let jwt = await AsyncStorage.getItem('jwt');
      if (is_logged_in !== null && jwt != null) {
        console.log("Async logged in variables: ", is_logged_in, jwt);
        return {
          success: true,
          error: null,
          is_logged_in: is_logged_in,
          jwt: jwt
        }
      }
    } catch (err) {
      // Error retrieving data
      console.log("Error occurred at getLoggedInVariables, AuthScreen: ", err);
      return {
        success: false,
        error: err,
        is_logged_in: null,
        jwt: null
      };
    }
    return {
      success: false,
      error: "Variables not found",
      is_logged_in: null,
      jwt: null
    };
  }

  async isLoggedIn() {
    try {
      let is_logged_in = await AsyncStorage.getItem('is_logged_in');
      if (is_logged_in !== null && is_logged_in == "true") {
        console.log("Async is_logged_in: ", is_logged_in);
        return true;
      }
    } catch (err) {
      // Error retrieving data
      console.log("Error occurred at getLoggedInVariables, AuthScreen: ", err);
      return false;
    }
    return false;
  }

  async loginUser(username, password, callback) {
    fetch(this.state.server_url.concat('/login'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("Response: ", response);
        if (response.success) {
          this.setLoggedInVariables("true", response.jwt.toString())
            .then(resp => {
              callback({
                success: true,
                login_disabled: false,
                username: "",
                password: "",
              });
            })
            .catch(resp => {
              callback({
                success: false,
                login_disabled: false,
                login_warning: "Some Error Occurred",
              });
            });
        } else {
          callback({
            success: false,
            login_disabled: false,
            login_warning: "Username/Password incorrect",
            username: "",
            password: "",
          });
        }
      })
      .catch(error => {
        console.error("Error: ", error);
        callback({
          success: false,
          login_disabled: false,
        });
      });
  }

}

export {
  Auth,
}
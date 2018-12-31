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

const isTrue = (arg) => {
    if (["True", "true", "T", "t", true, 1].indexOf(arg) != -1) {
        return true;
    }
    return false;
}

const isFalse = (arg) => {
    if (["False", "false", "F", "f", false, 0].indexOf(arg) != -1) {
        return true;
    }
    return false;
}

class AuthService {

    constructor() {}

    static async setLoggedInVariables(logged_in, jwt) {
        try {
            if (typeof(logged_in) == typeof(true)) {
                if (isTrue(logged_in)) logged_in = "true";
                else logged_in = "false";
            }
            if (typeof(logged_in) == typeof("string") && typeof(jwt) == typeof("string")) {
                await AsyncStorage.multiSet([
                    ["logged_in", logged_in],
                    ["jwt", jwt]
                ]);
                return true;
            }
            return false;
        } catch (e) {
            console.log("Error occurred in AsyncStorage: ", e);
            return false;
        }
    }

    static async clearLoggedInVariables() {
        try {
            await AsyncStorage.removeItem('logged_in');
            await AsyncStorage.removeItem('jwt');
            return true;
        } catch (e) {
            console.log("Error occurred in AsyncStorage: ", e);
            return false;
        }
    }

    static async getLoggedInVariables() {
        try {
            let logged_in = await AsyncStorage.getItem('logged_in');
            let jwt = await AsyncStorage.getItem('jwt');
            console.log("getLoggedInVariables: ", logged_in, jwt, isTrue(logged_in));
            if (logged_in != null && jwt != null) {
                return {
                    success: true,
                    error: null,
                    logged_in: isTrue(logged_in),
                    jwt: jwt
                }
            }
        } catch (err) {
            // Error retrieving data
            console.log("Error occurred at getLoggedInVariables, AuthScreen: ", err);
            return {
                success: false,
                error: err,
                logged_in: null,
                jwt: null
            };
        }
        return {
            success: false,
            error: "Variables not found",
            logged_in: false,
            jwt: ""
        };
    }

    static async isLoggedIn() {
        try {
            let logged_in = await AsyncStorage.getItem('logged_in');
            if (logged_in !== null && logged_in == "true") {
                return true;
            }
        } catch (err) {
            // Error retrieving data
            console.log("Error occurred at getLoggedInVariables, AuthScreen: ", err);
            return false;
        }
        return false;
    }

    static async confirmLoggedIn() {
        return AuthService.getLoggedInVariables()
            .then(logged_in_variables => {
                // console.log("Flag 0: ", logged_in_variables);
                if (isTrue(logged_in_variables.logged_in)) {
                    // console.log("Flag 1, ", logged_in_variables);
                    return fetch(SERVER_URL.concat('/is_logged_in'), {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': logged_in_variables.jwt,
                            },
                        })
                        .then(response => response.json())
                        .then(response => {
                            // console.log("Flag 2: ", response);
                            if (response.success) {
                                User.update(response);
                                Auth.update({
                                    logged_in: true,
                                    jwt: logged_in_variables.jwt
                                });
                                return true;
                            }
                            return false;
                        })
                        .catch(err => {
                            console.error("Error in confirmLoggedIn(AuthService.js): ", err);
                            return false;
                        });
                } else {
                    return false;                    
                }
            })
            .catch(err => {
                console.error("Error in confirmLoggedIn(AuthService.js): ", err);
                return false;
            });
    }

    static async logoutUser(updateLoggedInStatus) {
        return AuthService.clearLoggedInVariables()
                    .then(resp => {
                        User.update({
                            name: null,
                            id: null,
                            _id: null,
                            username: null,
                            admin: false,
                        });
                        Auth.update({
                            logged_in: false,
                            jwt: "",
                        });
                        updateLoggedInStatus(false);
                        return true;
                    })
                    .catch(err => {
                        console.error("Error in logoutUser LoginScreen: ", err);
                        return false;
                    });
    }

    static async loginUser(username, password) {
        return fetch(SERVER_URL.concat('/login'), {
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
                if (response.success) {
                    User.update(response);
                    console.log("Setting setLoggedInVariables with: ", response);
                    return this.setLoggedInVariables("true", response.jwt.toString())
                        .then(resp => {
                            console.log("setLoggedInVariables set: ", resp);
                            return {
                                success: true,
                                login_disabled: false,
                                username: "",
                                password: "",
                                jwt: response.jwt.toString(),
                            };
                        })
                        .catch(resp => {
                            return {
                                success: false,
                                login_disabled: false,
                                login_warning: "Some Error Occurred",
                            };
                        });
                } else {
                    return {
                        success: false,
                        login_disabled: false,
                        login_warning: "Username/Password incorrect",
                        username: "",
                        password: "",
                    };
                }
            })
            .catch(error => {
                console.error("Error: ", error);
                return {
                    success: false,
                    login_disabled: false,
                };
            });
    }

}

export default AuthService;
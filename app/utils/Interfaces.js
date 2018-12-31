class User {
	static details = {
		name: null,
		id: null,
		_id: null,
		username: null,
		admin: false
	};

	static update(data) {
		User.details.name = data.name;
		User.details.id = data.id;
		User.details._id = data._id;
		User.details.username = data.username;
		User.details.admin = data.admin;
	}

	static getUserDetails() {
		return User.details;
	}
}

class Auth {
	static logged_in = null;
	static jwt = null;
	static user = null;

	static update(data) {
		Auth.logged_in = data.logged_in;
		Auth.jwt = data.jwt;
		Auth.user = User.getUserDetails();
	}

	static getAuth() {
		return {
			logged_in: Auth.logged_in,
			user: User.getUserDetails()
		}
	}
}

export {
	Auth,
	User,
}

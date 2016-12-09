import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

@Injectable()
export class UserActions {
	static LOAD_USERS = "[User] Load Users";
	static LOAD_USERS_SUCCESS = "[User] Load Users Success";
	static ADD_USER = "[User] Add user";
	static ADD_USER_SUCCESS = "[User] Add user success";

	loadUsers(): Action {
		console.log("step2");
		return {
			type: UserActions.LOAD_USERS
		};
	}

	loadUsersSuccess(users): Action {
		console.log("step3");
		return {
			type: UserActions.LOAD_USERS_SUCCESS,
			payload: users
		};
	}

	addUser(user): Action {
		return {
			type: UserActions.ADD_USER,
			payload: user
		};
	}

	addUserSuccess(user): Action {
		return {
			type: UserActions.ADD_USER_SUCCESS,
			payload: user
		};
	}
}

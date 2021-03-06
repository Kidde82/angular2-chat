import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

@Injectable()
export class UserActions {
	static LOAD_USERS = "[User] Load Users";
	static LOAD_USERS_SUCCESS = "[User] Load Users Success";
	static ADD_USER = "[User] Add user";
	static ADD_USER_SUCCESS = "[User] Add user success";
	static UPDATE_USER = "[User] Update user";
	static UPDATE_USER_SUCCESS = "[User] Update user success";

	loadUsers(): Action {
		return {
			type: UserActions.LOAD_USERS
		};
	}

	loadUsersSuccess(users): Action {
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

	updateUser(user): Action {
		return {
			type: UserActions.UPDATE_USER,
			payload: user
		};
	}

	updateUserSuccess(user): Action {
		return {
			type: UserActions.UPDATE_USER_SUCCESS,
			payload: user
		};
	}
}

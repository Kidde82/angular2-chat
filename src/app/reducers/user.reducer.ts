import { Action } from "redux";

import { UserActions } from "../actions";
import { User } from "../models";

export interface UsersState {
	users: User[];
}

const initialState: UsersState = {
	users: []
}

export const UsersReducer =
	function(state: UsersState = initialState, action: Action): UsersState {
		switch (action.type) {
			case UserActions.ADD: {
				const user: User = (<UserActions.AddAction>action).user;
				return {
					users: [...state.users, user]
				};
			}
			default:
				return state;
		}
	}

export const getUsersState = (state): UsersState => state.users;

import * as _ from "lodash";
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import { User } from "../models/User";
import { UserActions } from "../actions";

export type UserListState = User[];

const initialState: UserListState = [];

export default function (state = initialState, action: Action): UserListState {
	switch (action.type) {
		case UserActions.LOAD_USERS_SUCCESS: {
			return action.payload;
		}
		case UserActions.ADD_USER_SUCCESS: {
			return [...state, action.payload];
		}
		default: {
			return state;
		}
	}
}

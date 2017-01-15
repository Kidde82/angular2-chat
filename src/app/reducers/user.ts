import {Action} from "@ngrx/store";

import { User } from "../models/User";
import { UserActions } from "../actions";

export type UserState = User;

const initialState: UserState = {
	id: "0",
	info: {
		nickname: ""
	},
	typing: false
};

export default function (state= initialState, action: Action): UserState {
	switch (action.type) {
		default: {
			return state;
		}
	}
}

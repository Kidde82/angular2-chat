import { Action, ActionCreator } from "redux";
import { User } from "../models/user";

export const ADD = "[User] Add";

export interface AddAction extends Action {
	user: User;
}

export interface ListAction extends Action {
}

export const addAction: ActionCreator<AddAction> =
	(user) => ({
		type: ADD,
		user: user
	});

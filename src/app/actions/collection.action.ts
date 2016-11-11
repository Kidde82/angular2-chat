import { Action } from "@ngrx/store";

import { type } from "../utils/util";
import { User } from "../models/user";

export const ActionTypes = {
	ADD_USER: type("[Collection] Add User"),
	ADD_USER_SUCCESS: type("[Collection] Add User Success"),
	ADD_USER_FAIL: type("[Collection] Add User Fail"),
	REMOVE_USER: type("[Collection] Remove User"),
	REMOVE_USER_SUCCESS: type("[Collection] Remove User Success"),
	REMOVE_USER_FAIL: type("[Collection] Remove User Fail"),
	LOAD: type("[Collection] Load"),
	LOAD_SUCCESS: type("[Collection] Load Success"),
	LOAD_FAIL: type("[Collection] Load Fail")
}

export class AddUserAction implements Action {
	type = ActionTypes.ADD_USER;

	constructor(public payload: User) {}
}

export class AddUserSuccessAction implements Action {
	type = ActionTypes.ADD_USER_SUCCESS;

	constructor (public payload: User) {}
}

export class AddUserFailAction implements Action {
	type = ActionTypes.ADD_USER_FAIL;

	constructor (public payload: User) {}
}

export class RemoveUserAction implements Action {
	type = ActionTypes.REMOVE_USER;

	constructor(public payload: User) {}
}

export class RemoveUserSuccessAction implements Action {
	type = ActionTypes.REMOVE_USER_SUCCESS;

	constructor(public payload: User) {}
}

export class RemoveUserFailAction implements Action {
	type = ActionTypes.REMOVE_USER_FAIL;

	constructor(public payload: User) {}
}

export class LoadAction implements Action {
	type = ActionTypes.LOAD;

	constructor() {}
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: User[]) {}
}

export class LoadFailAction implements Action {
	type = ActionTypes.LOAD_FAIL;

	constructor(public payload: any) {}
}

export type Actions
	= AddUserAction
	| AddUserSuccessAction
	| AddUserFailAction
	| RemoveUserAction
	| RemoveUserSuccessAction
	| RemoveUserFailAction
	| LoadAction
	| LoadSuccessAction
	| LoadFailAction

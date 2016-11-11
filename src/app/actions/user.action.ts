import { Action } from "@ngrx/store";

import { type } from "../utils/util";
import { User } from "../models/user";

export const ActionTypes = {
	LOAD: type("[User] Load")
}

export class LoadAction implements Action {
	type = ActionTypes.LOAD;

	constructor(public payload: User) {}
}

export type Actions
	= LoadAction;

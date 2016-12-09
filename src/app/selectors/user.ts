import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AppState } from "../reducers";
import { User } from "../models";

@Injectable()
export class UserSelector {
	getUsers() {
		return (state: AppState): User[] => state.users;
	}
}

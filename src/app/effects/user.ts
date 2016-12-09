import "rxjs/add/operator/switchMap";
import 'rxjs';
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { AppState } from "../reducers";
import { UserActions } from "../actions";
import { UserService } from "../services";

@Injectable()
export class UserEffects {
	constructor (
		private update$: Actions,
		private userActions: UserActions,
		private userService: UserService,
	) { }

	@Effect() loadUsers$ = this.update$
		.ofType(UserActions.LOAD_USERS)
		.switchMap(() => this.userService.getUsers())
		.map(users => this.userActions.loadUsersSuccess(users));
}

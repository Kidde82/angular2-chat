import { Component } from "@angular/core";
import { Store } from '@ngrx/store';

import { User } from "../../models";
import { UserService } from "../../services";
import { AppState } from "../../reducers";
import { UserActions } from "../../actions";

@Component({
	selector: "user-add",
	templateUrl: "./user-add.component.html"
})
export class UserAddComponent {

	constructor (
		private store: Store<AppState>,
		private userService: UserService,
		private userActions: UserActions
	) {	}

	saveUser(nickname: HTMLInputElement) {
		let user: User = {
			id: "",
			info: { nickname: nickname.value }
		}
		this.userService.save(user);
		this.store.dispatch(this.userActions.addUserSuccess(user));
		nickname.value = "";
	}
}

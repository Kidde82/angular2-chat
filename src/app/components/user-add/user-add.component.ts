import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { User } from "../../models";
import { UserService, SessionStorageService } from "../../services";
import { AppState } from "../../reducers";
import { UserActions } from "../../actions";

@Component({
	selector: "user-add",
	templateUrl: "./user-add.component.html"
})
export class UserAddComponent {
	private errorMessage: string = "";

	constructor (
		private store: Store<AppState>,
		private userService: UserService,
		private userActions: UserActions,
		private sessionStorageService:SessionStorageService
	) {	}

	saveUser(nickname: HTMLInputElement) {
		let user: User = {
			id: "",
			info: { nickname: nickname.value }
		}

		this.userService.save(user)
			.subscribe(
				hero  => {
					this.store.dispatch(this.userActions.addUserSuccess(user))
					this.sessionStorageService.writeObject("currentUser", user);
				},
				error =>  this.errorMessage = <any>error);

		nickname.value = "";
	}
}

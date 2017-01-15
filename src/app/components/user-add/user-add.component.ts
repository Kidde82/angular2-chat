import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { User } from "../../models";
import { UserService, SessionStorageService } from "../../services";
import { AppState } from "../../reducers";
import { UserActions } from "../../actions";
import { UserSelector } from "../../selectors";

@Component({
	selector: "user-add",
	templateUrl: "./user-add.component.html",
	providers: [UserSelector]
})
export class UserAddComponent {

	private errorMessage: string = "";

	constructor (
		private store: Store<AppState>,
		private userService: UserService,
		private userActions: UserActions,
		private sessionStorageService: SessionStorageService,
		private userSelector: UserSelector
	) { }

	getUser(nickname: HTMLInputElement) {
		this.saveUser(nickname.value);
		nickname.value = "";
	}

	onKey(event:any) {
		if (event.key === "Enter") {
			this.saveUser(event.target.value);
			event.target.value = "";
		}
	}

	private saveUser(nickname: string) {
		this.nextUserId().subscribe((nextUserId) => {
			let user: User = {
				id: nextUserId,
				info: {
					nickname: nickname
				},
				typing: false
			}

			this.userService.save(user)
				.subscribe(
					res  => {
						this.store.dispatch(this.userActions.addUserSuccess(user))
						this.sessionStorageService.writeObject("currentUser", user);
					},
					error => this.errorMessage = <any>error);
		});
	}

	private nextUserId(): any {
		return this.userService.getUsers().map(
			res => {
				return (res.length + 1).toString();
			}
		)
	}
}

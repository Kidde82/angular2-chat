import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

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
export class UserAddComponent implements OnInit {

	private errorMessage: string = "";

	constructor (
		private store: Store<AppState>,
		private userService: UserService,
		private userActions: UserActions,
		private sessionStorageService:SessionStorageService,
		private userSelector: UserSelector
	) {	}

	ngOnInit() {
		this.store.dispatch(this.userActions.loadUsers());
	}

	saveUser(nickname: HTMLInputElement) {
		let user: User = {
			id: this.nextUserId(),
			info: {
				nickname: nickname.value
			}
		}

		this.userService.save(user)
			.subscribe(
				res  => {
					this.store.dispatch(this.userActions.addUserSuccess(user))
					this.sessionStorageService.writeObject("currentUser", user);
				},
				error => this.errorMessage = <any>error);

		nickname.value = "";
	}

	private nextUserId(): string {
		let nextId = "";
		this.store.select(this.userSelector.getUsers()).subscribe(
				res => {
					nextId = (res.length + 1).toString();
				}
			);
		return nextId;
	}
}

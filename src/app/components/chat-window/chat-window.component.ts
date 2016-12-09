import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { AppState } from "../../reducers";
import { UserActions } from "../../actions";
import { UserService } from "../../services";
import { User } from "../../models";

@Component({
	selector: "chat-window",
	templateUrl: "./chat-window.component.html"
})
export class ChatWindowComponent {
	// users$: Observable<User[]>;

	constructor (
		private store: Store<AppState>,
		private userActions: UserActions,
		private userService: UserService,
	) {
		// let user1 = { id: "1", info: { nickname: "adam" }};
		// let user2 = { id: "2", info: { nickname: "bertil" }};
		// let user3 = { id: "3", info: { nickname: "caesar" }};
		// this.store.dispatch(this.userActions.addUserSuccess(user1));
		// this.store.dispatch(this.userActions.addUserSuccess(user2));
		// this.store.dispatch(this.userActions.addUserSuccess(user3));
		// this.users$ = store.select("users");

		IntervalObservable.create(2000).subscribe(
			() => {
				console.log("yep");
				this.store.dispatch(this.userActions.loadUsers());
			}
		);
		// console.log(this.userService.getUsers());
	}

	ngOnInit() {
		console.log("step1");
		this.store.dispatch(this.userActions.loadUsers());
	}
}

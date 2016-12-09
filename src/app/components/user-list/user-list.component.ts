import "rxjs/add/operator/let";
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { AppState } from "../../reducers";
import { UserSelector } from "../../selectors";
import { User } from "../../models";

@Component({
	selector: "user-list",
	templateUrl: "./user-list.component.html",
	providers: [UserSelector]
})
export class UserListComponent implements OnInit {
	users$: Observable<User[]>;

	constructor (
		private store: Store<AppState>,
		private userSelector: UserSelector
	) {
		this.users$ = store.select(this.userSelector.getUsers());
	}
	ngOnInit() {
		console.log("user-list");
		console.log(this.users$);
	}
}

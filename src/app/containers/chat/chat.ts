import { Component, OnInit, OnChanges, Inject } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromRoot from '../../reducers';
import { UserService, SessionStorageService } from "../../services";
import { User } from "../../models";

@Component({
	selector: "chat",
	styleUrls: ["./chat.css"],
	templateUrl: "./chat.html"
})
export class Chat implements OnInit, OnChanges {

	constructor(
		public store: Store<fromRoot.State>,
		private userService: UserService,
		private sessionStorageService: SessionStorageService
	) {
		store.subscribe(() => this.updateState());
		this.updateState();
	}

	ngOnInit() {
		console.log("OnInit");
	}

	ngOnChanges() {
		console.log("OnChange");
	}

	updateState() {
		console.log("Updatestate chat.ts");
		console.log(this.store.select("users"));
	}

	clearSession() {
		console.log("clearSession");
		this.sessionStorageService.remove("currentUser");
	}

	get userIsSet(): boolean {
		// let currentUser = this.sessionStorageService.readObject<User>("currentUser");
		// if (currentUser)
		// 	return true;
		return false;
	}
}

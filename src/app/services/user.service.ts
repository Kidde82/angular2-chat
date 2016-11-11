import "rxjs/add/operator/count";
import { Injectable, Inject } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromRoot from "../reducers";
import * as collection from "../actions/collection.action";

import { SessionStorageService } from "./session-storage.service";
import { User } from "../models";

@Injectable()
export class UserService {

	constructor (
		private store: Store<fromRoot.State>,
		private sessionStorageService: SessionStorageService
	) {}

	getAll(): Observable<User[]> {
		return this.store.select("users");
	}

	save(user: User): void {
		console.log("save user");
		if (!user.id) {
			user.id = this.getNextId();
		}
		this.sessionStorageService.writeObject("currentUser", user);

		this.store.dispatch(new collection.AddUserAction(user));
	}

	private getNextId(): string {
		let nextId = "";
		let count: Observable<number> = this.store.let(fromRoot.getUsersState).count(() => { return true;});
		count.subscribe((x) => {
			nextId = x.toString();
		});
		return nextId;
	}
}

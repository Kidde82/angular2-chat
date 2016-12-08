import "rxjs/add/operator/count";
import { Injectable, Inject } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { SessionStorageService } from "./session-storage.service";
import { User } from "../models";

@Injectable()
export class UserService {

	constructor (
		private sessionStorageService: SessionStorageService
	) {}

	getAll(): Observable<User[]> {
		// return this.store.select("users");
		return null;
	}

	save(user: User): void {
		console.log("save user");
		if (!user.id) {
			user.id = this.getNextId();
		}
		this.sessionStorageService.writeObject("currentUser", user);

		// this.store.dispatch(new collection.AddUserAction(user));
	}

	private getNextId(): string {
		return "1";
		// let nextId = "";
		// let count: Observable<number> = this.store.let(fromRoot.getUsersState).count(() => { return true;});
		// count.subscribe((x) => {
		// 	nextId = x.toString();
		// });
		// return nextId;
	}
}

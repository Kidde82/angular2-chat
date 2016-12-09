import "rxjs/add/operator/count";
import "rxjs/add/operator/map";
import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { SessionStorageService } from "./session-storage.service";
import { User } from "../models";

@Injectable()
export class UserService {
	private apiUrl: string = "http://localhost:3001";

	constructor (
		private http: Http
	) {}

	getUsers(): Observable<User[]> {
		return this.http.get(this.apiUrl + "/api/v1/users")
		.map(res => res.json());
	}

	save(user: User): void {
		if (!user.id) {
			user.id = this.getNextId();
		}
		// this.sessionStorageService.writeObject("currentUser", user);

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

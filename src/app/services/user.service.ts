import "rxjs/add/operator/count";
import "rxjs/add/operator/map";
import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { SessionStorageService } from "./session-storage.service";
import { User } from "../models";

@Injectable()
export class UserService {
	// private apiUrl: string = "http://localhost:3001/api/v1/";
	private apiUrl: string = "http://localhost:3001/";

	constructor (
		private http: Http
	) {}

	getUsers(): Observable<User[]> {
		return this.http.get(this.apiUrl + "users")
				.map(res => {
					return res.json();
				})
		}

	save(user: User): Observable<User> {
		console.log("save");
		console.log(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.apiUrl + "users", user, options)
				.map(this.extractData)
				.catch(this.handleError);
	}

	update(user: User): Observable<User> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		console.log("updateuser");
		console.log(user);
		return this.http.put(this.apiUrl + "users/" + user.id, user, options)
				.map(this.extractData)
				.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}

	private handleError (error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}

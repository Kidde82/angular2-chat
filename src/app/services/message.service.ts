import "rxjs/add/operator/count";
import "rxjs/add/operator/map";
import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { SessionStorageService } from "./session-storage.service";
import { Message } from "../models";

@Injectable()
export class MessageService {
	private apiUrl: string = "http://localhost:3001";

	constructor (
		private http: Http
	) {}

	getMessages(): Observable<Message[]> {
		return this.http.get(this.apiUrl + "/api/v1/messages")
		.map(res => res.json());
	}

	save(message: Message): Observable<Message> {
		if (!message.id) {
			message.id = this.getNextId();
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.apiUrl + "/api/v1/message", message, options)
				.map(this.extractData)
				.catch(this.handleError);
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

import { Component, Input } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import * as fromRoot from "../../reducers";
import { User } from "../../models";

@Component({
	selector: "chat-window",
	templateUrl: "./chat-window.component.html"
})
export class ChatWindowComponent {
	users$: Observable<User[]>;

	constructor (store: Store<fromRoot.State>) {
		this.users$ = store.let(fromRoot.getUserCollection);
	}
}

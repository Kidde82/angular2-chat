import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { AppState } from "../../reducers";
import { UserActions, MessageActions } from "../../actions";
import { UserService, MessageService } from "../../services";
import { User, Message } from "../../models";

@Component({
	selector: "chat-window",
	templateUrl: "./chat-window.component.html"
})
export class ChatWindowComponent implements OnInit {

	constructor (
		private store: Store<AppState>,
		private userActions: UserActions,
		private userService: UserService,
		private messageActions: MessageActions,
		private messageService: MessageService
	) {
		IntervalObservable.create(2000).subscribe(
			() => {
				this.store.dispatch(this.userActions.loadUsers());
				this.store.dispatch(this.messageActions.loadMessages());
			}
		);
	}

	ngOnInit() {
		this.store.dispatch(this.userActions.loadUsers());
		this.store.dispatch(this.messageActions.loadMessages());
	}
}

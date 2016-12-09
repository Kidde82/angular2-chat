import "rxjs/add/operator/let";
import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { AppState } from "../../reducers";
import { MessageService, SessionStorageService } from "../../services";
import { MessageActions } from "../../actions";
import { MessageSelector } from "../../selectors";
import { Message, User } from "../../models";

@Component({
	selector: "chat-messages",
	templateUrl: "./chat-messages.component.html",
	providers: [MessageSelector]
})
export class ChatMessagesComponent implements OnInit {
	messages$: Observable<Message[]>;
	private errorMessage: string = "";
	private currentUser: User;

	constructor (
		private store: Store<AppState>,
		private messageSelector: MessageSelector,
		private messageService: MessageService,
		private messageActions: MessageActions,
		private sessionStorageService: SessionStorageService
	) {
		this.messages$ = store.select(this.messageSelector.getMessages());
	}

	ngOnInit() {
		console.log("chat messages oninit");
		this.currentUser = this.sessionStorageService.readObject("currentUser") as User;
	}

	saveMessage(newMessage: HTMLInputElement) {
		let message: Message = {
			id: "",
			user: this.currentUser,
			timestamp: new Date(),
			content: newMessage.value
		}

		this.messageService.save(message)
			.subscribe(
				hero  => this.store.dispatch(this.messageActions.addMessageSuccess(message)),
				error =>  this.errorMessage = <any>error);

		newMessage.value = "";
	}
}

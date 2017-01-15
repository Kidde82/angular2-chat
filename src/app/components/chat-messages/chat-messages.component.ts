import "rxjs/add/operator/let";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as moment from 'moment';

import { AppState } from "../../reducers";
import { MessageService, SessionStorageService, UserService } from "../../services";
import { MessageActions, UserActions } from "../../actions";
import { MessageSelector, UserSelector } from "../../selectors";
import { Message, User } from "../../models";

@Component({
	selector: "chat-messages",
	templateUrl: "./chat-messages.component.html",
	styleUrls: ["./chat-messages.component.css"],
	providers: [MessageSelector, UserSelector]
})
export class ChatMessagesComponent {

	messages$: Observable<Message[]>;
	typingUsers$: Observable<User[]>;
	private errorMessage: string = "";
	private currentUser: User;

	constructor (
		private store: Store<AppState>,
		private messageSelector: MessageSelector,
		private messageService: MessageService,
		private messageActions: MessageActions,
		private sessionStorageService: SessionStorageService,
		private userActions: UserActions,
		private userService: UserService,
		private userSelector: UserSelector
	) {
		this.currentUser = this.sessionStorageService.readObject("currentUser") as User;
		this.messages$ = store.select(this.messageSelector.getMessages());
		this.typingUsers$ = store.select(this.userSelector.getTypingUsers(this.currentUser));
		this.typingUsers$.subscribe(res => {
			console.log(res);
		});
	}

	getMessage(newMessage: HTMLInputElement) {
		this.saveMessage(newMessage.value);
		newMessage.value = "";
		this.updateTyping(false);
	}

	getDateTime(datetime: Date): string {
		return moment(datetime).format("YYYY-MM-DD HH:mm");
	}

	onKey(event:any) {
		if (event.key === "Enter") {
			this.saveMessage(event.target.value);
			event.target.value = "";
			this.updateTyping(false);
		} else if (event.target.value.length > 0) {
			if (!this.currentUser.typing) {
				this.updateTyping(true);
			}
		} else {
			this.updateTyping(false);
		}
	}

	private saveMessage(content: string) {
		let message: Message = {
			id: this.nextMessageId(),
			user: this.currentUser,
			timestamp: new Date(),
			content: content
		}

		this.messageService.save(message)
			.subscribe(
				message  => this.store.dispatch(this.messageActions.addMessageSuccess(message)),
				error =>  this.errorMessage = <any>error);
	}

	private updateTyping(typing: boolean) {
		let user = this.currentUser;
		user.typing = typing;
		console.log("updatetyping");
		console.log(user);
		this.userService.update(user)
			.subscribe(
				res  => {
					this.store.dispatch(this.userActions.updateUserSuccess(user))
				},
				error => this.errorMessage = <any>error);
	}

	private nextMessageId(): string {
		let nextId = "";
		this.messages$.subscribe(res => {
			nextId = (res.length + 1).toString();
		});
		return nextId;
	}
}

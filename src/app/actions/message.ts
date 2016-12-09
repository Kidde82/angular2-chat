import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

@Injectable()
export class MessageActions {
	static LOAD_MESSAGES = "[Message] Load Messages";
	static LOAD_MESSAGES_SUCCESS = "[Message] Load Messages Success";
	static ADD_MESSAGE = "[Message] Add Message";
	static ADD_MESSAGE_SUCCESS = "[Message] Add Message Success";

	loadMessages(): Action {
		return {
			type: MessageActions.LOAD_MESSAGES
		};
	}

	loadMessagesSuccess(messages): Action {
		return {
			type: MessageActions.LOAD_MESSAGES_SUCCESS,
			payload: messages
		};
	}

	addMessage(message): Action {
		return {
			type: MessageActions.ADD_MESSAGE,
			payload: message
		};
	}

	addMessageSuccess(message): Action {
		return {
			type: MessageActions.ADD_MESSAGE_SUCCESS,
			payload: message
		};
	}
}

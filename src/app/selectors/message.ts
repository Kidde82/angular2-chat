import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AppState } from "../reducers";
import { Message } from "../models";

@Injectable()
export class MessageSelector {
	getMessages() {
		return (state: AppState): Message[] => state.messages;
	}
}

import * as _ from "lodash";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import { Message } from "../models";
import { MessageActions } from "../actions";

export type MessageListState = Message[];

const initialState: MessageListState = [];

export default function (state = initialState, action: Action): MessageListState {
	switch (action.type) {
		case MessageActions.LOAD_MESSAGES_SUCCESS: {
			return action.payload;
		}
		case MessageActions.ADD_MESSAGE_SUCCESS: {
			return [...state, action.payload];
		}
		default: {
			return state;
		}
	}
}

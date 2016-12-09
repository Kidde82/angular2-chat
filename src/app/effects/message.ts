import "rxjs/add/operator/switchMap";
import 'rxjs';
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { AppState } from "../reducers";
import { MessageActions } from "../actions";
import { MessageService } from "../services";

@Injectable()
export class MessageEffects {
	constructor (
		private update$: Actions,
		private messageActions: MessageActions,
		private messageService: MessageService,
	) { }

	@Effect() loadMessages$ = this.update$
		.ofType(MessageActions.LOAD_MESSAGES)
		.switchMap(() => this.messageService.getMessages())
		.map(messages => this.messageActions.loadMessagesSuccess(messages));
}

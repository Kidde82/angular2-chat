import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';

import { Chat } from "./containers/chat/chat";
import reducer from "./reducers";
import { UserActions, MessageActions } from "./actions";
import { UserService, MessageService, SessionStorageService } from "./services";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserAddComponent } from "./components/user-add/user-add.component";
import { ChatWindowComponent } from "./components/chat-window/chat-window.component";
import { ChatMessagesComponent } from "./components/chat-messages/chat-messages.component";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app.component";
import { UserEffects, MessageEffects } from './effects';

@NgModule({
	declarations: [
		AppComponent,
		Chat,
		UserListComponent,
		UserAddComponent,
		ChatWindowComponent,
		ChatMessagesComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		StoreModule.provideStore(reducer),
		EffectsModule.run(UserEffects),
		EffectsModule.run(MessageEffects),
		RouterModule.forRoot(rootRouterConfig, { useHash: true })
	],
	providers: [
		UserService,
		UserActions,
		MessageService,
		MessageActions,
		SessionStorageService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {
	constructor() { }
}

import { NgModule, Inject } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app";
import { Github } from "./github/shared/github";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { About } from './about/about';
import { Chat } from './containers/chat/chat';
import { RepoBrowser } from './github/repo-browser/repo-browser';
import { RepoList } from './github/repo-list/repo-list';
import { RepoDetail } from './github/repo-detail/repo-detail';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { UserService, SessionStorageService } from "./services";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserAddComponent } from "./components/user-add/user-add.component";
import { ChatWindowComponent } from "./components/chat-window/chat-window.component";
import { ChatMessagesComponent } from "./components/chat-messages/chat-messages.component";

@NgModule({
	declarations: [
		AppComponent,
		About,
		RepoBrowser,
		RepoList,
		RepoDetail,
		Chat,
		UserListComponent,
		UserAddComponent,
		ChatWindowComponent,
		ChatMessagesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(rootRouterConfig)
	],
	providers: [
		UserService,
		SessionStorageService,
		Github,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	constructor() {
		console.log("constructor");
	}
}

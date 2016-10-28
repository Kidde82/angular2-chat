import { NgModule, Inject } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app";
import { Github } from "./github/shared/github";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { About } from './about/about';
import { Home } from './containers/home/home';
import { RepoBrowser } from './github/repo-browser/repo-browser';
import { RepoList } from './github/repo-list/repo-list';
import { RepoDetail } from './github/repo-detail/repo-detail';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { createStore, Store, compose } from "redux";
import { AppStore } from "./app-store";
import { AppState, default as reducer } from "./reducers";

@NgModule({
	declarations: [AppComponent, About, RepoBrowser, RepoList, RepoDetail, Home],
	imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
	providers: [
		Github,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		{
			provide: AppStore,
			useFactory: () => store
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(@Inject(AppStore) private store: Store<AppState>) {
		console.log("constructor");
	}
}

let store: Store<AppState> = createStore<AppState>(
	reducer
);

import { Component, OnInit, Inject } from '@angular/core';
import { Store } from "redux";
import { AppStore } from "../../app-store";
import { AppState } from "../../reducers";
import { UserActions } from "../../actions";
@Component({
	selector: 'home',
	styleUrls: ['./home.css'],
	templateUrl: './home.html'
})
export class Home implements OnInit {

	constructor(@Inject(AppStore) private store: Store<AppState>) {
		console.log("Home");
		store.subscribe(() => this.updateState());
		this.updateState();
	}

	ngOnInit() {
		console.log("The init");
	}

	updateState() {
		console.log(this.store.getState());
	}

	addnickname(nickname: HTMLInputElement) {
		console.log(nickname.value);
		let state = this.store.getState();
		let nextId: number = state.users.users.length + 1;

		this.store.dispatch(UserActions.addAction(
			{
				id: nextId,
				nickname: nickname.value
			}
		));
		nickname.value = "";
	}
}

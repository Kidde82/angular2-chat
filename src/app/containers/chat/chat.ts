import { Component, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { UserService, SessionStorageService } from "../../services";
import { User } from "../../models";

@Component({
	selector: "chat",
	styleUrls: ["./chat.css"],
	templateUrl: "./chat.html"
})
export class Chat {

	constructor(
		private userService: UserService,
		private sessionStorageService: SessionStorageService
	) { }

	clearSession() {
		this.sessionStorageService.remove("currentUser");
	}

	get hasUser(): boolean {
		let currentUser = this.sessionStorageService.readObject<User>("currentUser");
		if (currentUser)
			return true;
		return false;
	}
}

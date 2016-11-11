import { Component } from "@angular/core";

import { User } from "../../models";
import { UserService } from "../../services";

@Component({
	selector: "user-add",
	templateUrl: "./user-add.component.html"
})
export class UserAddComponent {
	constructor (private userService: UserService) {
	}

	saveUser(nickname: HTMLInputElement) {
		let user: User = {
			id: "",
			info: { nickname: nickname.value }
		}
		this.userService.save(user);
		nickname.value = "";
	}
}

import 'rxjs/add/operator/let';
import { Component, Input, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import { User } from "../../models";

@Component({
	selector: "user-list",
	templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit {
	@Input() users: User[];

	ngOnInit() {
		console.log("user-list");
		console.log(this.users);
	}
}
